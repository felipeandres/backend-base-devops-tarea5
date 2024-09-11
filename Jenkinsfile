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
            stage('SonarQube: Upload Report') {
                steps {
                    script {
                        withSonarQubeEnv('SonarQube') { 
                            sh 'sonar-scanner'
                        }
                    }
                }
            }
        
        stage('SonarQube: Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Construir imagen Docker') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_REGISTRY}/my-app:${env.BUILD_NUMBER} .'
                }
            }
        }

        stage('Subir imagen al registry Nexus') {
            steps {
                script {
                    sh 'docker push ${DOCKER_REGISTRY}/my-app:${env.BUILD_NUMBER}'
                }
            }
        }

        stage('Actualizar imagen en Kubernetes') {
            steps {
                script {
                    sh 'kubectl set image deployment/${K8S_DEPLOYMENT} my-app=${DOCKER_REGISTRY}/my-app:${env.BUILD_NUMBER} -n ${K8S_NAMESPACE}'
                }
            }
        }
    }
}
