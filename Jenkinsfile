pipeline {
 
  agent any
  
 stages {
   stage("build") {
     steps {
       echo 'building the application...'
       'npm install'
     }
   }

   stage("test") {
     steps {
       echo 'testing the application...'
       'npm test'
     }
   }

   stage("deploy") {
     steps {
       echo 'deployng the application...'
     }
   }
 }
  
}
