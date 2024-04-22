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

#### Backend - Quick Run

    cd Backend/target
    java -jar Backend-0.0.1-SNAPSHOT.jar  

#### Database
    
    # Create the database (run only once)
    docker compose up -d
    
    # Start the database
    docker start ProjectHubDB

    # Connect to the database
    psql -h localhost -p 5432 -U scott

    # Stop the database
    docker stop ProjectHubDB