pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.41.0-jammy' // Uses a specific Playwright version
            label 'docker' // Still runs on your docker-enabled node
        }
    }
    
    stages {
        // You can remove the 'Clean workspace' and 'Checkout' stages 
        // if you want, as Jenkins does this automatically at the start.
        
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                // We use 'npx playwright test' here
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
