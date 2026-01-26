pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                deleteDir()
                checkout scm
                bat 'npm ci'
                bat 'npx playwright install --with-deps' // --with-deps handles system OS dependencies
            }
        }
        stage('Run Playwright tests') {
            steps {
                // We use 'catchError' or a 'post' block so the build doesn't 
                // just "hard fail" before reporting.
                bat 'npx playwright test --reporter=html'
            }
        }
    }

    post {
        always {
            // This runs even if tests fail
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
}
