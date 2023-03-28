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
    }
  }
  
  stage('Build and push Docker image') {
    steps {
        script {
            def dockerTool = tool name: 'docker-tool', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
            env.PATH = "${dockerTool}/bin:${env.PATH}"
        }
        sh "docker build -t ${DOCKERHUB_USERNAME}/player_pairs_node:${env.BUILD_NUMBER} ."
        withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}'
        }
        sh "docker push ${DOCKERHUB_USERNAME}/player_pairs_node:${env.BUILD_NUMBER}"
    }
  }
  
  stage('Deploy to EC2') {
     steps {
         withCredentials([aws(credentialsId: 'aws-credentials', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
             withCredentials([sshUserPrivateKey(credentialsId: 'pp-server-credentials', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                 sshagent(credentials: ['pp-server-credentials']) {
                     sh 'REMOTE_USER="ubuntu"'
                     sh 'REMOTE_HOST="44.210.144.192"'
                     sh 'CONTAINER_NAME="player-pairs-container"'
                     sh "IMAGE_NAME=\\${DOCKERHUB_USERNAME}/player_pairs_node"
                     sh "IMAGE_TAG=\\${env.BUILD_NUMBER}"
                     sh """
                     ssh -o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY $REMOTE_USER@$REMOTE_HOST "\
                        docker pull $IMAGE_NAME:$IMAGE_TAG && \
                        docker stop $CONTAINER_NAME || true && \
                        docker rm $CONTAINER_NAME || true && \
                        docker run -d --name $CONTAINER_NAME $IMAGE_NAME:$IMAGE_TAG
                    "
                    """
                 }
             }
         }
     }
  }
 }
}
