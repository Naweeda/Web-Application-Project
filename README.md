# E-Commerce Website

# Created by
- Kevin Chan
- Naweeda Qeyam
- Marlon Bustamante
- Robert Freeman

# About this app
- This app is an e-commerce website that is very similar to Craigslist in which users can post items for sale and message sellers to offer the best deal.

# Features
- Login Validation
- Password Encryption
- User Registration
- Posting an Item for sale(includes image upload)
- Viewing all listings created by everyone 
- Enter a text chat with the seller

# Technologies Used
- Websockets and Redis for messaging
- MongoDB/Robo3T for keeping data of user, listing info, and messages
- Microservices concept
- React Redux for storing state of login, registration, and listing info
- Bootstrap/React Bootstrap for some styling

# How to Run the App
- Run Robo3T and redis-server
- Npm start
- node server/gateway.js
- node server/server.js
- node server/messanger.js
- node server/websockets.js

# Building Docker Containers

    docker build --no-cache -t server-demo -f server.Dockerfile .
    docker build --no-cache -t react-demo -f frontend.Dockerfile .
    docker build --no-cache -t gateway -f gateway.Dockerfile .
    docker build --no-cache -t messanger-demo -f messanger.Dockerfile .
    docker build --no-cache -t websocket-demo -f websocket.Dockerfile .