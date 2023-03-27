pipeline {
 
 agent any

 environment {
     DOCKERHUB_USERNAME = 'davidnlagrange'
     DOCKERHUB_PASSWORD = credentials('docker-hub-repo')
 }
  
 stages {
  stage('Deploy to EC2') {
    steps {
        withCredentials([aws(credentialsId: 'aws_credentials', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
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
