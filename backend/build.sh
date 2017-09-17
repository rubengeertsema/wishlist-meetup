#!/usr/bin/env bash
./mvnw clean install
eval $(minikube docker-env) && docker build -t backend:latest .