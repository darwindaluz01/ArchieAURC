pipeline {
    agent { label 'docker' }
    
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
                sh 'npm ci'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test --reporter=html'
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
