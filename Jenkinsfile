pipeline {
 
  agent any
  
  stages {
    stage("build") {
      steps {
        echo 'building the application...'
        sh 'npm install' // use 'bat' for Windows-based systems
      }
    }

    stage("test") {
      steps {
        echo 'testing the application...'
        sh 'npm test' // use 'bat' for Windows-based systems
      }
    }

    stage("deploy") {
      steps {
        echo 'deploying the application...'
        // Add your deployment steps here
      }
    }
  }
  
}