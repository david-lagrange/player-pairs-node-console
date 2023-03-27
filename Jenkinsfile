pipeline {
 
 agent any

 environment {
     DOCKERHUB_USERNAME = 'your_dockerhub_username'
     DOCKERHUB_PASSWORD = credentials('your_dockerhub_credentials_id')
     AWS_ACCESS_KEY_ID = credentials('your_aws_access_key_id')
     AWS_SECRET_ACCESS_KEY = credentials('your_aws_secret_access_key')
     EC2_KEY_PATH = 'path/to/your_ec2_key.pem'
     EC2_IP_ADDRESS = 'your_ec2_ip_address'
 }
  
}
