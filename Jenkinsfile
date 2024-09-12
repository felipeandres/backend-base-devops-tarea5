pipeline {
    agent any

    stages {
        stage('Instalar dependencias') {
            agent{
                docker {
                    image 'node:20.11.1-alpine3.19'
                }
            }
        stages {
                stage('Instalada dependencias') {
                    steps {
                        script {
                            sh 'npm install'
                        }
                    }
                }
                stage('Testing') {
                    steps {
                        script {
                            sh 'npm test'
                        }
                    }
                }

                stage('Build') {
                    steps {
                        script {
                            sh 'npm run build'
                        }
                    }
                }
            }
        }
        stage('Calidad Tarea 5'){
            stages {
                stage('SonarQube analysis') {
                    agent {
                        docker {
                            image 'sonarsource/sonar-scanner-cli' 
                            args '--network="devops-infra_default"'
                            reuseNode true
                        }
                    }
                    steps {
                        withSonarQubeEnv('sonarqubetarea5') {
                            sh 'sonar-scanner'
                        }
                    }
                }
                stage('Calidad Gate') {
                    steps {
                        timeout(time: 30, unit: 'SECONDS') {
                            waitForQualityGate abortPipeline: true
                        }
                    }
                }
            }
        }
        stage('Docker'){
            steps{
                sh 'docker build -t backend-base-devops-tarea5:latest .'
            }
        }
    }
            
}
