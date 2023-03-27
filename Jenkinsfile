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
  
}
