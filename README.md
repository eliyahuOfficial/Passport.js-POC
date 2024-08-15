# Passport.js-POC

This project is a Proof of Concept (POC) for implementing user authentication using **Passport.js** with **Express** and **Mongoose**. The project includes user login, session management, and a protected dashboard.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Postman Documentation](#postman-documentation)

## Getting Started

This project demonstrates how to implement user authentication using Passport.js with session management in an Express application. It includes:

- User login with email and password.
- Session management using `express-session`.
- Access control for a protected dashboard route.
- Logout functionality.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) (version 12.x or higher).
- You have installed [MongoDB](https://www.mongodb.com/) and it is running locally on the default port `27017`.

## Running the Project

To start the development server, run:

npm run dev
npm create-user


The server will start on http://localhost:8080, and you'll see a message indicating that it's connected to MongoDB.



## API Endpoints
1. Login
URL: /login
Method: POST
Headers:
Content-Type: application/json


2. Dashboard
URL: /dashboard
Method: GET
Headers:
Cookie: connect.sid=<session_id>
Description: Access the protected dashboard route. Requires an authenticated session.

3. Logout
URL: /logout
Method: GET
Headers:
Cookie: connect.sid=<session_id>
Description: Logs the user out and redirects to the home page.


 ## Postman Documentation
For more detailed documentation and examples, you can refer to the Postman documentation for this API:

https://documenter.getpostman.com/view/33710711/2sA3s7j9Dn


-------------------------------------------------------------------

If sessions are not maintained across requests, ensure that cookies are enabled in Postman and that the connect.sid cookie is being sent in subsequent requests.
MongoDB Connection:
Ensure MongoDB is running on the default port (27017) and that the connection string in .env is correct.


