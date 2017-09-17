#!/usr/bin/env bash

function usage() {
  printf "Usage: $0 {prod}\n\n"
  printf "Options:\n"
  printf "  prod         deploy to prod\n"
  printf "  help         show help\n\n"
  exit 1
}

function deploy() {
  NAMESPACE="$@"
    case "${NAMESPACE}" in
        prod)
            DIR=$(pwd)
            cd ${DIR}/kubernetes && kubectl delete -f frontend.yml -n prod > /dev/null 2>&1
            cd ${DIR}/kubernetes && kubectl apply -f frontend.yml -n prod
            cd ${DIR}
            ;;
        help)
            usage
            ;;
        *)
            echo "Unknown namespace: [${NAMESPACE}]"
            usage
            ;;
    esac
}

deploy $@
