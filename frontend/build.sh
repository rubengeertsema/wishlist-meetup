#!/usr/bin/env bash
npm run prod
eval $(minikube docker-env) && docker build -t frontend:latest .
