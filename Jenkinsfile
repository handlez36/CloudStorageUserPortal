pipeline {
  agent any
  stages {
    stage('Prepare Env') {
      parallel {
        stage('Dev1 Env') {
          when { branch 'master' }
          steps {
            slackSend(color: '#0E4749', message: "Build Initiated - This was started by ${env.COMMITTER} and probably going to end up in production unless @mike.norris or @MarkS has something to say about it. ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
            script {
              echo 'We are about to execute in a production environment'
              writeFile file: 'environment', text: 'dev1', encoding: "UTF-8"
            }
          }
        }
      }
    }

    stage('Init') {
      environment {
        BUILD_ENV = readFile('environment')
      }
      steps {
        dir(path: './') {
          script {
            echo "Branch Name: ${env.BRANCH_NAME}"
            echo 'Set the ISSUE env var'
          }
          script {
            echo "Environment = ${env.BUILD_ENV}"
            echo "Developer = ${env.BUILD_DEVELOPER}"
            echo "Issue = ${env.ISSUE}"
          }
        }
      }
    }
    stage('Build') {
      parallel {
        stage('NON-Production') {
          when { not { expression { BRANCH_NAME ==~ /(production|master)/ } } }
          environment {
            BUILD_ENV_LIVE = readFile('environment')
          }
          steps {
            dir(path: './') {
              sh 'pwd'
              sh "cp .env.${env.BUILD_ENV_LIVE} .env"
              sh "cp .env.${env.BUILD_ENV_LIVE} .env.production"
              sh "${YARN} install && ${YARN} --pure-lockfile --verbose build"
              dir(path: 'build/') {
                sh "tar pczvf artifact-${env.BUILD_ENV_LIVE}-${env.BUILD_ID}.tgz ./* .htaccess"
                archiveArtifacts "artifact-${env.BUILD_ENV_LIVE}-${env.BUILD_ID}.tgz"
              }
              slackSend(color: '#95C623', message: "Yay we created an artifact - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
            }
          }
        }
      }
    }
    stage('Deploy') {
      parallel {
        stage('Deploy Dev1') {
          when { branch 'master' }
          environment {
            BUILD_ENV_LIVE = readFile('environment')
          }
          steps {
            dir(path: 'build/') {
              slackSend(color: '#0E4749', message: "We are going to try to release this to (<https://test.mydcblox.com|test.mydcblox.com>)")
              script {
                sh "ssh scm@10.1.141.30 'rm -fr /var/www/html/dev1/*'"
                sh "rsync -avz --progress --stats ./* scm@10.1.141.30:/var/www/html/dev1/"
                sh "rsync -avz --progress --stats ./.htaccess scm@10.1.141.30:/var/www/html/dev1/"
              }
            }
          }
        }
      }
    }
  }
  environment {
    YARN = '/usr/bin/yarn'
    BUILD_PATH = 'build/'
    ISSUE = sh(returnStdout: true, script: "echo \"${BRANCH_NAME}\" | grep -oP \"[A-Z]{1,5}-[0-9]{1,5}\" | sed -n 1p").trim()
    BUILD_DEVELOPER = 'theNewGuy'
    DEV_QA_UAT = false
    COMMITTER = sh( script: 'git --no-pager show -s --format=\'%ae\'', returnStdout: true).trim()
  }
  post {
    failure {
      slackSend(color: '#EF0000', message: "Build FAILED - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
      emailext(recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}", body: "It no work-e! ${env.BUILD_URL}\n${currentBuild.currentResult}\n")
    }
    changed {
      slackSend(color: '#0E4749', message: "Build Pipeline Status Changed - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
    }
    regression {
      slackSend(color: '#EF0000', message: "Build Pipeline Status Changed - Well this was working at one point! ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
    }
    fixed {
      slackSend(color: '#95C623', message: "Build Pipeline Status Changed - All good! We are back to green. ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
    }
    aborted {
      slackSend(color: '#E55812', message: "Abandon ship!! ${env.JOB_NAME} ${env.BUILD_NUMBER} aborted prematurely. If HB481 passes Georgia law then this would be illegal.(<${env.BUILD_URL}|Open>)")
    }
    success {
      slackSend(color: '#95C623', message: "Build Passed with flying colors...if colors could fly - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
    }
  }
}
