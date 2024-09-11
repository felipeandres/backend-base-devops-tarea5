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

        stage('SonarQube: Upload Report') {
            steps {
                withSonarQubeEnv('SonarQube') { 
                    sh 'sonar-scanner'
                }
            }
        }

        stage('SonarQube: Quality Gate') {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }

        stage('Construir imagen Docker') {
            steps {
                sh 'docker build -t ${DOCKER_REGISTRY}/my-app:${env.BUILD_NUMBER} .'
            }
        }

        stage('Subir imagen al registry Nexus') {
            steps {
                sh 'docker push ${DOCKER_REGISTRY}/my-app:${env.BUILD_NUMBER}'
            }
        }

        stage('Actualizar imagen en Kubernetes') {
            steps {
                sh 'kubectl set image deployment/${K8S_DEPLOYMENT} my-app=${DOCKER_REGISTRY}/my-app:${env.BUILD_NUMBER} -n ${K8S_NAMESPACE}'
            }
        }
    }
}
