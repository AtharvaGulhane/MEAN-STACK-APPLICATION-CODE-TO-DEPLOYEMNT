# MEAN Stack Application Deployment

This repository contains the code and configuration for deploying a MEAN stack application using Docker, Kubernetes, and Jenkins.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Deployment Steps](#deployment-steps)
- [Accessing the Application](#accessing-the-application)
- [Deployment Screenshots](#deployment-screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Future Enchancements Planned](#future-enchancements-planned)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed.
- **Docker** installed and running.
- **Kubernetes** installed (e.g., using Minikube).
- **Jenkins** set up with Docker and Kubernetes integration.
- **kubectl** configured to interact with your Kubernetes cluster.

You also refer an projecct i had previously made for more information - [HTML-PODS-DEPLOYMENT](https://github.com/AtharvaGulhane/HTML-PODS-DEPLOYMENT)
To Understand the implementation in more detail.

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AtharvaGulhane/MEAN-STACK-APPLICATION-CODE-TO-DEPLOYEMNT.git
   cd MEAN-STACK-APPLICATION-CODE-TO-DEPLOYEMNT
   ```

2. **Install Dependencies**

   Navigate to each of the directories (frontend, backend) and install dependencies:

   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

3. **Set Up Jenkins Credentials**

   - Add Docker Hub and GitHub credentials in Jenkins.
   - Set up the necessary environment variables in your Jenkins pipeline.

## Deployment Steps

1. **Configure Kubernetes Manifests**
   
   Update the Kubernetes service types in the YAML files as needed. For local deployment, set the service type to `NodePort`.

2. **Build Docker Images**

   Use the Jenkins pipeline to build and push the Docker images for the frontend, backend, and MongoDB.

3. **Deploy to Kubernetes**

   Apply the Kubernetes manifests using the following commands in your Jenkinsfile or manually:

   ```bash
   kubectl apply -f mongodb/mongo-pvc.yaml
   kubectl apply -f mongodb/mongodb-pod.yaml
   kubectl apply -f mongodb/mongodb-service.yaml
   kubectl apply -f frontend/frontend-pod.yaml
   kubectl apply -f frontend/frontend-service.yaml
   kubectl apply -f backend/backend-pod.yaml
   kubectl apply -f backend/backend-service.yaml
   ```

## Accessing the Application

To access the application, run the following command:

```bash
minikube service frontend-service --url
```

This command will provide you with the URL to access your frontend application.

## Deployment Screenshots

Below are some screenshots showcasing the Jenkins deployment process:

### Jenkins Deployment Start
![Jenkins Deployment Start](images/Starting%20New%20Deployemnt.png)

### Jenkins Deployment Completion
![Jenkins Deployment Completion](images/Succesful%20Deployemnt.png)

## Jenkins Output
[View Jenkins Output](output/Jenkins%20Output.txt)

## Future Enchancements Planned
- Enhance the Jenkins pipeline with more stages for testing and integration.
- Implement application security measures such as scanning for vulnerabilities.
- Explore cloud deployment options to improve scalability and availability.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
