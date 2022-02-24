**Introduction**

This repository contains the implementation of an ecommerce microservice. It includes the following services:

 - Customer Service
	 - Create, Read, Update, Delete
 - Product Service
	 - Create, Read, Update, Delete
 - Order Service
	 - Create, Read, Update, Delete
	 - Publishes new order to message broker
	 - Receives payment status from message broker
	 - Updates order with payment status
 - Payment Service
	 - Receives new order from message broker
	 - Initiates payment (no actual implementation) returns at random SUCCESS|FAILED
	 - Publishes payment status to message broker
	 - Receives payment status from message broker 
	 - Saves record to transaciton history

**Architecture**

![Basic Architecture diagram](https://res.cloudinary.com/dpyywotyh/image/upload/v1645660311/EcommerceArchitecture_omepg6.png)

**Installation**

 1. Clone the repository
 2. At the root of the directory which includes the docker-compose.yml file, run the command below:
```
docker-compose up
```
3. Wait for docker to compose all services. Watch the docker desktop and ensure all services are running. Services like the Order service and Payment service depends on rabbitMQ so might take a bit longer before running.
4. You can lauch the services with the urls below:


- Customer Service [http://localhost:4001/api/customer](http://localhost:4001/api/customer)
		
- Product Service [http://localhost:4004/api/product](http://localhost:4004/api/product)
		
- Order Service [http://localhost:4003/api/order](http://localhost:4003/api/order)
		
- Payment Service [http://localhost:4002/api/payment](http://localhost:4002/api/payment)
		
- RabbitMQ UI [http://localhost:15672/](http://localhost:15672/)
