PART 1
======

## GENERAL
In this meetup we will use a simple WishList application. This application can be used to post and delete wishes. The 
backend has a MongoDB for persistence and a spring-boot micro-service. The frontend will be an Angular 4 application.
The goal is to deploy all components to Kubernetes and to fully automate the deployment of the frontend application 
with an automated Jenkins build pipeline.

## START-UP 
To proceed with the Angular frontend part we first need to get a little familiar with docker, Kubernetes, minikube and 
kubectl. We will try to accomplish this during the next steps. Also notice the below links. They will provide all the 
information needed to complete the steps in this part of the meetup and of course don't hesitate to ask questions when 
things are unclear!

Links:
* https://kubernetes.io/docs/getting-started-guides/minikube/
* https://kubernetes.io/docs/user-guide/kubectl-cheatsheet/
* https://docs.docker.com/engine/reference/commandline/docker/

### 1) Spin-up environment
If not already done, start your local Kubernetes environment as described here: 
[minikube-meetup](https://github.com/rubengeertsema/minikube-meetup).

### 2) Kubernetes dashboard
The dev-tools `Jenkins` and `Gitlab` are running on the local Kubernetes environment. Try to find these tools in the 
Kubernetes dashboard. Use `minikube --help` to find the command to open the dashboard.

### 3) List all docker images running on minikube
Use the terminal to list all docker images and containers running on minikube (hint: to do so, you need to switch 
docker daemon).

### 4) Kubernetes controller
`kubectl` is the Kubernetes command line interface and can be used to interact with Kubernetes. Run `kubectl --help` to
see all possible options.

### 5) List namespaces
Kubernetes has namespaces to separate environments. By default Kubernetes has the namespaces `kube-public`, 
`kube-system` and `default`. In this meetup we have two additional namespaces. Use `kubectl` to list these namespaces.

### 6) List pods
The containers running on minikube listed in a previous step are present on the minikube virtual machine but are not 
necessarily managed by Kubernetes. Containers will be managed by Kubernetes when they run in pods. Pods can have one or 
more docker containers.

Use `kubectl` to: 
* list all pods running on Kubernetes (hint: use the flag `--all-namespaces`)
* list the pods running on a specific namespace

### 7) Move into a container running in a pod
Sometimes it is necessary to move into a running container. Use `kubectl` to move into the running Jenkins container and 
find out the installed version numbers for:

* docker
* node
* npm

Note: you can use the command `kubectl exec -ti <pod name> -- bash`. Make sure to use the correct namespace.

Now check whether you can list all docker containers running on the minikube virtual machine from within the Jenkins 
docker container. This is needed for the frontend pipeline we will eventually build. Also check if you can list all pods 
within the Jenkins container running on Kubernetes with `kubectl`.

Lastly, exit the Jenkins container (run the command `exit`).

### 8) List services
Services can be seen as virtual ip's. Kubernetes uses them to manage traffic between pods. Now Use `kubectl` to list all 
services. 

In the output you will see a port mapping, e.g. `8080:30312/TCP`. The second port number is the node-port and can be 
used to access a deployment from outside. Try to open Jenkins in a web browser with the found port number.
 
Hint: use http://minikube-ip/node-port/jenkins

### 9) List ingresses
An ingress is used to expose a service to a context path. For example, in this meetup we have mapped the jenkins service
to the context path `/jenkins`. Now Jenkins is accessible on http://$(minikube ip)/jenkins.

Now use `kubectl` to list all ingresses in the `tools` namespace.

### 10) Describe ingress
Use `kubectl` to find the context path for gitlab. Notice that you can also see the backend it is connecting to. Now 
open gitlab in a web browser.

Hint: use `kubectl describe <resource-type> <ingress-name>`. Also use the correct namespace.

### 11) Traefik
Traefik (pronounced like traffic) is an HTTP reverse proxy and load balancer (also see [traefik](https://traefik.io/)).
In this meetup we use it to manage all traffic to the outside world. Traefik also has a dashboard where you can see all
running (micro) services. Try to find and open this dashboard in a browser.

Hint: use `kubectl` to list all services and look for the external ip and port.


### All pieces together
The connections between all the Kubernetes resources described in the previous steps above can be simply summarized in 
the diagram below.

[outside world] -- [traefik] -- [ingress] -- [service] -- [application instance 1, 2, ....n]
                                                      

## DEPLOY BACKEND
As mentioned before, the backend has a mongodb for persistence and a spring-boot micro service exposing a REST api to
the outside world. In this part we will deploy these components to Kubernetes.

### 1) Deployment descriptor
A deployment descriptor can be used to easily mange deployments to Kubernetes. For the backend you can take a look at 
the [backend deployment descriptor file](./backend/kubernetes/backend.yml). Notice we have configured the following:

* Ingress
* Service
* Deployment

Here the ingress will handle the traffic to the outside world (managed by traefik). The ingress does so by mapping the
path `/backend` to the specified service called `backend`. The service handles the internal traffic to the backend pods.
This mechanism makes it possible to scale pods in case we need to handle lots of traffic. Of course we need to build our 
micro-services stateless. Otherwise things will get out of sync. 

### 2) Deploy mongodb
The same mechanism as described in the previous step accounts for the mongodb that will be used for persistence. Take a 
look at the [mongodb deployment descriptor](./mongo/kubernetes/mongo.yml). As you can see, we did not define an ingress 
for mongodb. We did so, because the database does not need to be exposed to the outside world (the micro service will 
connect to the database).

Note: in production you would most likely never put your persistence in a container. Imagine the container crashing...
Kubernetes has solutions for this, however that is out of scope for this meetup.

Use `kubectl` to deploy mongodb to the Kubernetes namespace called `prod`.

### 3) Check mongo logging
You can use the Kubernetes dashboard to check the container logging. Try to find out if the deployment of mongodb
succeeded. The mongodb logging should state something like 
`2017-10-11T09:33:44.601+0000 I NETWORK  [thread1] waiting for connections on port 27017`.

Hint: go to `pods -> mongo`

### 4) Build backend jar
Now we are ready to actually build our backend package. Go to the backend dir and build the backend by running:
```
./mvnw clean install
```

Note: you need to have the Java 8 SDK installed for this.

### 5) Build backend docker
Now we can build a docker image containing the backend package. Go to the backend dir and build the backend docker image 
by running the below command. Make sure to build on the minikube docker daemon.
```
docker build -t backend:latest .
```

Note: Normally you would deploy a docker image to the cluster from a container registry. However, for simplicity we will 
deploy from our locally listed docker images. Since we use minikube, we need to make sure to build the docker image on 
the minikube docker daemon. Otherwise the image wont be present on the minikube virtual machine and thus cannot be 
deployed to the cluster.

Now check if the image is present on the minikube docker environment by running `docker images`. It should be listed 
there.

### 6) Deploy backend
Use `kubectl` to deploy the backend to the Kubernetes namespace called `prod`.

Hint: use `kubectl apply` for this.

### 7) Delete backend
Now use `kubectl` to delete the deployment. Check the dashboard to see if all went well.

Hint: use `kubectl delete` for this.

### 8) Re-deploy backend 
Re-deploy the backend micro-service and open the dashboard to see if all went well. You can also check the traefik 
dashboard. It should also be listed there.

### 9) Auto-healing
In the Kubernetes dashboard go to the `pods` section (namespace prod). Try to kill the backend micro-service by deleting 
pods. You will find out this is not possible. Kubernetes will automatically heal itself to match the configured 
configuration (that's awesome!).

Note: there are even games on the market where you can do pod shooting. Goal is to defeat Kubernetes :)

### 10) Scale backend
We configured to run 2 backend instances by default. You can see this in the backend deployment descriptor 
[backend deployment descriptor file](./backend/kubernetes/backend.yml)(the option replicas). Try to scale up to 3 
instances via the Kubernetes dashboard. Also check the traefik dashboard to see the new backend instance listed there. 
Be easy on your laptop and do not scale up to much. Just keep it with 3 instances. Afterwards, scale back to two 
instances.

Hint: you can do this in the `Deployments` section. 

### 11) Check if the backend is functioning
As mentioned before the backend is a spring-boot micro-service connected to a MongoDB. Do a rest call to the backend 
api to see if it is functioning. Use the commands below.

Post a wish: 
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"description": "test description","title": "test title"}' http://$(minikube ip)/backend/api
```

Get all wishes: 
```
curl -X GET http://$(minikube ip)/backend/api
```

Delete all wishes:
```
curl -X DELETE http://$(minikube ip)/backend/api
```

You can also test the backend through the swagger-ui. Try to find how to get there and test the api with swagger.
Also see: http://springfox.github.io/springfox/docs/current/#springfox-swagger-ui

## END PART 1
Now we have a basic understanding of Kubernetes. Lets move on to the next part! Check out the next git branch where we
will focus on the WishList frontend.