pipeline {
 
 agent any

 environment {
     DOCKERHUB_USERNAME = 'davidnlagrange'
     DOCKERHUB_PASSWORD = credentials('docker-hub-repo')
     AWS_ACCESS_KEY_ID = credentials('aws-credentials')
     AWS_SECRET_ACCESS_KEY = credentials('aws-credentials')
     EC2_KEY_PATH = 'path/to/your_ec2_key.pem'
     EC2_IP_ADDRESS = 'your_ec2_ip_address'
 }
  
 stages {
  stage('Deploy to EC2') {
    steps {
        withCredentials([
            string(credentialsId: 'aws_access_key_id', variable: 'AWS_ACCESS_KEY_ID'),
            string(credentialsId: 'aws_secret_access_key', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {
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
