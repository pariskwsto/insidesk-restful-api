-include .env

dev:
	@echo " > Running development services..."
	@docker-compose -f docker-compose.dev.yml up