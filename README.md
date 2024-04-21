# ProjectHub

## Setup

#### Frontend

- Install Node.js

#### Backend

- Install Java version >= 17
- Install Maven

#### Database

- Install Docker
- Install Docker Compose

## Run

#### Frontend

    cd frontend
    npm install
    npm start

#### Backend

    cd Backend
    ./mvnw spring-boot:run

#### Database
    
    # Create the database
    docker compose up -d
    
    # Start the database
    docker start ProjectHubDB

    # Connect to the database
    psql -h localhost -p 5432 -U scott
