pipeline {
 
 agent any

 environment {
     DOCKERHUB_USERNAME = 'davidnlagrange'
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
            def nodejs = tool name: 'node19', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
            env.PATH = "${nodejs}/bin:${env.PATH}"
        }
        sh 'npm ci'
        sh 'npm test'
        sh 'echo "new test"'
        sh 'echo "${env.BUILD_NUMBER}"'
    }
  }
  
  stage('Build and push Docker image') {
    steps {
        script {
            def dockerTool = tool name: 'docker-tool', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
            env.PATH = "${dockerTool}/bin:${env.PATH}"
        }
        sh 'docker build -t ${DOCKERHUB_USERNAME}/player_pairs_node:latest .'
        withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}'
        }
        sh 'docker push ${DOCKERHUB_USERNAME}/player_pairs_node:latest'
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
