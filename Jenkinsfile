pipeline {
    agent any
    
    environment {
        SONARQUBE_URL = 'http://sonarqube-server:9000'
        DOCKER_REGISTRY = 'nexus-registry-url'
        K8S_DEPLOYMENT = 'kubernetes-deployment-name'
        K8S_NAMESPACE = 'Felipe_Lopez_Flore'
    }

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
                            args '--network="devops-infra"'
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
                        timeout(time: 10, unit: 'SECONDS') {
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
