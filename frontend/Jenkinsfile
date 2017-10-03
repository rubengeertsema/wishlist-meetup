#!groovy

/**
 * WishList multi branch frontend pipeline
 */

def err = null
currentBuild.result = "SUCCESS"

properties([
  buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '25')),
  pipelineTriggers([pollSCM('H/5 * * * *')])
])

try {
  String imageName = 'frontend'
  String commitHash

  node() {

    echo "JENKINS_HOME = ${env.JENKINS_HOME}"
    echo "WORKSPACE = ${env.WORKSPACE}"
    echo "JOB_NAME = ${env.JOB_NAME}"
    echo "BUILD_NUMBER = ${env.BUILD_NUMBER}"

    stage('checkout') {
      checkout scm
      commitHash = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
      echo "BRANCH_NAME = ${env.BRANCH_NAME}"
    }

    stage('install packages') {
      sh 'npm install'
    }

    stage('unit test with coverage') {
      try {
        sh 'npm run test-headless'
      } finally {
        junit allowEmptyResults: false, testResults: 'reports/unit/*.xml'
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'reports/unit', reportFiles: 'testresults.html', reportName: 'Unit Test Report'])
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'reports/coverage', reportFiles: 'index.html', reportName: 'Code Coverage Report'])
      }
    }

    stage('linting') {
      sh 'npm run lint'
    }

    stage('run protractor tests') {
      try {
        sh 'npm run e2e-headless'
      } finally {
        step([$class: 'CucumberReportPublisher', jsonReportDirectory: "reports/e2e/json"])
      }
    }

    if (env.BRANCH_NAME != 'master') {
      stage('check build docker') {
        docker.build("${imageName}")
      }
    }
  }

  if (env.BRANCH_NAME == 'master') {
    node() {
      stage('build package') {
        sh 'npm run prod'
      }

      stage('build docker') {
        docker.build("${imageName}:${commitHash}")
      }
    }

    /**
     * Make sure to put milestones outside the Jenkins "node" block to free up Jenkins executor slots. Otherwise, these
     * slots keep being occupied eventually blocking new Jenkins jobs.
     */
    stage('promote-prod') {
      milestone()
      input "Promote ${commitHash} to prod?"
      milestone()
    }

    node() {
      stage('rollout frontend prod') {
        // Change the line [image: frontend:latest] into [image: frontend:commitHash] and pipe the result to kubctl
        sh "sed -r 's/(\\s+image:{1}.+:)(.+)/\\1${commitHash}/' kubernetes/frontend.yml | kubectl apply -n prod -f -"
      }
    }
  }
} catch (caughtError) {
  err = caughtError
  currentBuild.result = "FAILURE"
} finally {
  // You may want to add build result notifications here (e.g. mail, slack notify, etc.)
  if (err) {
    throw err
  }
}
