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
- MongoDB/Robo3T for keeping data of user and listing info
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