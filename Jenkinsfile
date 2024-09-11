pipeline {
    agent any
    
    environment {
        SONARQUBE_URL = 'http://sonarqube-server:9000'
        DOCKER_REGISTRY = 'nexus-registry-url'
        K8S_DEPLOYMENT = 'kubernetes-deployment-name'
        K8S_NAMESPACE = 'Felipe-Lopez'
    }

    stages {
        stage('Construccion y test'){
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19' 
                    reuseNode true
                }
            }
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Testing') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        }
    }
}
