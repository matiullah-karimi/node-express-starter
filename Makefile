NAME   := app
COMMIT := $$(git rev-parse --short HEAD)
TAG    := $$(git describe --abbrev=0)
PRE_TAG:= $$(git describe --abbrev=0 --tags `git rev-list --tags --skip=1 --max-count=1`)
IMG    := ${NAME}:${TAG}
LATEST := ${NAME}:latest

THIS_FILE := $(lastword $(MAEFILE_LIST))
.PHONY: help build up dowm

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

tag: ## echo the latest git tag
	echo "${TAG}"

pre_tag: ## echo the previus git tag
	echo "${PRE_TAG}"
build: ## Build the containers
	docker build -t $(IMG) . -f Dockerfile.prod
up: ## Up all services
	TAG=${TAG} docker-compose -f docker-compose.prod.yml up -d
down: ## down the current running instances
	TAG=${PRE_TAG} docker-compose -f docker-compose.prod.yml down
app_shell: ## login to app
	docker container exec -it residential bash
db_shell: ## login to database container
	docker container -it mongodb bash