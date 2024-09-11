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
        stage('Docker'){
            steps{
                sh 'docker build -t backend-base-devops-tarea5:latest .'
            }
        }
    }
            
}
