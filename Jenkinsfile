pipeline {
 
 agent any

 environment {
     DOCKERHUB_USERNAME = 'davidnlagrange'
     DOCKERHUB_PASSWORD = credentials('docker-hub-repo')
 }
  
 stages {
  
  stage('Checkout') {
   steps {
     git(
         url: 'https://github.com/LaGrange-Group/player-pairs-node-console.git',
         branch: 'main'
     )
   }
  }
  
  stage('Install dependencies and test') {
    steps {
        script {
            def nodejs = tool name: 'your_nodejs_installation', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
            env.PATH = "${nodejs}/bin:${env.PATH}"
        }
        sh 'npm ci'
        sh 'npm test'
    }
  }
  
  stage('Deploy to EC2') {
    steps {
        withCredentials([aws(credentialsId: 'aws-credentials', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
            sh '''
                # Echo the credentials (for testing purposes only)
                echo "AWS Access Key ID: ${AWS_ACCESS_KEY_ID}"
                echo "AWS Secret Access Key: ${AWS_SECRET_ACCESS_KEY}"

                # Your deployment script or commands go here
            '''
        }
    }
  }
  
  
 }
}
