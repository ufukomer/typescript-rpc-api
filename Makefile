NAME := noxart

up:
	docker build -t $(NAME) -f Dockerfile .
	docker-compose rm -fsv
	docker-compose up --build

test:
	docker-compose rm -fsv
	make docker-clean
	docker-compose -f docker-compose-test.yml up --build --exit-code-from test --abort-on-container-exit

docker-clean:
	@echo "Delete all untagged/dangling (<none>) images"
	-docker rmi `docker images -q -f dangling=true` --force
	-docker volume rm `docker volume ls -f dangling=true -q`
