pipeline {
    agent any

    stages {
        stage('Clean workspace') {
            steps {
                deleteDir()
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Install Playwright browsers') {
            steps {
                bat 'npx playwright install'
            }
        }
        stage('Run Playwright tests') {
            steps {
                //bat 'npx playwright test --headed --reporter=html'
                bat 'npx playwright test --reporter=html'
            }
        }


        /*
        stage('Wait before publishing report') {
            steps {
                // Wait 5 seconds to ensure all files are closed
                sleep(time: 5, unit: 'SECONDS')
            }
        }
        stage('Publish HTML report') {
            steps {
                publishHTML (target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
        */
    }
}
