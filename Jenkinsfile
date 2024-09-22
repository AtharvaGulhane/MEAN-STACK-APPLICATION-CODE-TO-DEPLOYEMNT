pipeline {
    agent any

    environment {
        FRONTEND_DOCKER_IMAGE = 'gulhaneatharva/mean-frontend'
        BACKEND_DOCKER_IMAGE = 'gulhaneatharva/mean-backend'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        GIT_CREDENTIALS_ID = 'github-private-repo'
        KUBECONFIG_PATH = 'C:\\Users\\AG\\.kube\\config'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: "${GIT_CREDENTIALS_ID}", url: 'https://github.com/AtharvaGulhane/MEAN-STACK-APPLICATION-CODE-TO-DEPLOYEMNT', branch: 'main'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dir('frontend') {
                        def frontendImage = docker.build("${FRONTEND_DOCKER_IMAGE}:${BUILD_NUMBER}")
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    dir('backend') {
                        def backendImage = docker.build("${BACKEND_DOCKER_IMAGE}:${BUILD_NUMBER}")
                    }
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        def frontendImage = docker.image("${FRONTEND_DOCKER_IMAGE}:${BUILD_NUMBER}")
                        frontendImage.push()
                        frontendImage.push('latest')
                    }
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        def backendImage = docker.image("${BACKEND_DOCKER_IMAGE}:${BUILD_NUMBER}")
                        backendImage.push()
                        backendImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                script {
                    def kubectlCmd = 'kubectl'

                    if (isUnix()) {
                        // Unix-like environments
                        sh "${kubectlCmd} config use-context minikube"
                        sh "${kubectlCmd} apply -f frontend-service.yaml"
                        sh "${kubectlCmd} apply -f backend-service.yaml"
                    } else {
                        // Windows environment using cmd or PowerShell
                        bat "${kubectlCmd} config use-context minikube"
                        bat "${kubectlCmd} apply -f frontend-service.yaml"
                        bat "${kubectlCmd} apply -f backend-service.yaml"
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'kubectl get pods'
                        sh 'kubectl get services'
                    } else {
                        bat 'kubectl get pods'
                        bat 'kubectl get services'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            cleanWs()  // Clean up the workspace after the pipeline completes
        }
    }
}
