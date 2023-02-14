# Kubernetes Calculator 🧮
The Calculator application takes advantage of a microservice architecture to provide an API that solves mathematical expressions. The available microservices are the _addition_, _subtraction_, _multiplication_ and _division_.

Additionally, a [CI/CD pipeline](.github/workflows/ci-cd.yml) was built with the help of GitHub Actions in order to automate the integration of software changes quickly and reliably into a Kubernetes Cluster deployed to Azure Kubernetes Service (AKS).

> <img src="https://user-images.githubusercontent.com/47757441/218872579-783414ec-3d54-4f7c-a2fe-33f4cfe49da8.png" width="500">

## CI/CD Pipeline
The CI/CD pipeline was divided into 3 stages:
1. `npm-test`: unit test the latest code code changes using NPM and _mocha_.
    ```sh
    $ npm run test
    > mocha services/**/test/*.js

    addition
        ✔ 2 + 2 should be 4 
    division
        ✔ 4 / 2 should be 2 
    multiplication
        ✔ 2 * 2 should be 4 
    subtraction
        ✔ 1 - 1 should be 0
    ```
2. `push-to-docker-hub`: build & push microservices images to Docker Hub using _docker-compose_.
3. `deploy-to-aks`: deploy the latest version of the application to an AKS cluster using Azure CLI and _kubectl_. 

Deployment configurations for Pods and Services can be found in the form of YAML files inside the [_pods_](pods) directory.

_Kubernetes Cluster services_:
```sh
$ kubectl get services

Services:
NAME             TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
addition         ClusterIP      10.0.223.36    <none>        80/TCP           2s
calculator       LoadBalancer   10.0.164.42    20.23.34.81   80:31993/TCP     1s
division         ClusterIP      10.0.6.244     <none>        80/TCP           1s
kubernetes       ClusterIP      10.0.0.1       <none>        443/TCP          3m24s
multiplication   ClusterIP      10.0.104.174   <none>        80/TCP           1s
subtraction      ClusterIP      10.0.66.115    <none>        80/TCP           1s
```


## Documentation
- [Deploy an AKS cluster using the Azure CLI](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli)
