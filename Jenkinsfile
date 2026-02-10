pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.41.0-jammy'
            label 'docker'
        }
    }
    
    stages {
        stage('Install dependencies') {
            steps {
                // Installs only what is in package-lock.json
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
            // This only runs if the node was successfully allocated
            script {
                try {
                    archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                } catch (Exception e) {
                    echo "Could not archive artifacts, likely because the build failed before starting."
                }
            }
        }
    }
}
