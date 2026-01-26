stage('Run Playwright tests') {
    steps {
        bat 'node -v'
        bat 'npm -v'
        bat 'npx playwright test --list'
        bat 'npx playwright test --reporter=html'
    }
}
