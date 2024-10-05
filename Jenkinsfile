pipeline {
    agent any

    environment {
        FRONTEND_DOCKER_IMAGE = 'gulhaneatharva/mean-frontend'
        BACKEND_DOCKER_IMAGE = 'gulhaneatharva/mean-backend'
        MONGODB_DOCKER_IMAGE = 'gulhaneatharva/mean-mongodb'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        GIT_CREDENTIALS_ID = 'github-private-repo'
        KUBECONFIG_PATH = 'C:\\Users\\AG\\.kube\\config'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: "${GIT_CREDENTIALS_ID}", url: 'https://github.com/AtharvaGulhane/MEAN-STACK-APPLICATION-CODE-TO-DEPLOYEMNT', branch: 'functional-branch'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dir('frontend') {
                        def frontendImage = docker.build("${FRONTEND_DOCKER_IMAGE}:${BUILD_NUMBER}", '--no-cache .')
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

        stage('Build Backend Docker Image') {
            steps {
                script {
                    dir('backend') {
                        def backendImage = docker.build("${BACKEND_DOCKER_IMAGE}:${BUILD_NUMBER}", '--no-cache .')
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

        stage('Build MongoDB Docker Image') {
            steps {
                script {
                    dir('mongodb') { // Assuming you have a directory for MongoDB
                        def mongoImage = docker.build("${MONGODB_DOCKER_IMAGE}:${BUILD_NUMBER}", '--no-cache .')
                    }
                }
            }
        }

        stage('Push MongoDB Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        def mongoImage = docker.image("${MONGODB_DOCKER_IMAGE}:${BUILD_NUMBER}")
                        mongoImage.push()
                        mongoImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy MongoDB') {
            steps {
                script {
                    def kubectlCmd = 'kubectl'

                    if (isUnix()) {
                        sh "${kubectlCmd} apply -f mongodb/mongo-pvc.yaml"
                        sh "${kubectlCmd} apply -f mongodb/mongodb-pod.yaml"
                        sh "${kubectlCmd} apply -f mongodb/mongodb-service.yaml"
                    } else {
                        // Windows environment using cmd or PowerShell
                        bat "${kubectlCmd} apply -f mongodb/mongo-pvc.yaml"
                        bat "${kubectlCmd} apply -f mongodb/mongodb-pod.yaml"
                        bat "${kubectlCmd} apply -f mongodb/mongodb-service.yaml"
                    }
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    def kubectlCmd = 'kubectl'

                    if (isUnix()) {
                        sh "${kubectlCmd} apply -f frontend/frontend-deployment.yaml"
            } else {
                        bat "${kubectlCmd} apply -f frontend/frontend-deployment.yaml"
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    def kubectlCmd = 'kubectl'

                    if (isUnix()) {
                        sh "${kubectlCmd} apply -f backend/backend-deployment.yaml"
            } else {
                        bat "${kubectlCmd} apply -f backend/backend-deployment.yaml"
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
