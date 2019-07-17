# Depenedencies
    "bcrypt": "^3.0.6",
    "cors": "^2.8.5",
    "dotenv": "^8.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongodb": "^3.2.7",
    "mongoose": "^5.6.4",
    "nodemon": "^1.19.1",
    "npm": "^6.10.0"


# Project structure
    - helpers
      - AuthHelper.js   ---- Functions related to the JWT and email and password validity
      - ResHelper.js    ---- Functions for making uniform responses
    - models
      - Company.js      ---- Mongoose schema of the company.
      - User.js         ---- Mongoose schema of the user. Contains password hashing functions
    - routes 
      - api
        - companies.js  ---- Contains all the endpoints related to companies.
        - login.js      ---- Endpoint for logging in
        - register.js   ---- Endpoint for registering
    - .dockerignore
    - .gitignore
    - .env              ---- Environment variable file
    - Dockerfile        ---- Docker configuration
    - README.md
    - package-lock.json
    - package.json      ---- Dependency manager
    - server.js         ---- Entry point to the application


# Queries
#### Register
```
curl -d '{
    "firstName":"value",
    "lastName":"value",
    "email":"value",        // Must be a valid email address
    "password":"value"      // At least 6 characters
        }' -H "Content-Type: application/json" -X POST http://localhost:5000/api/register
```
Returns a JWT

#### Login 
```
curl -d '{
    "email":"value",
    "password":"value"
        }' -H "Content-Type: application/json" -X POST http://localhost:5000/api/login
```
Returns a JWT

#### Get companies
```
curl -X GET http://localhost:5000/api/companies
```
Returns an array containing all companies


#### Get company
```
curl -X GET http://localhost:5000/api/companies/:id
```
Returns requested company


#### Create company 
Requires token
```
curl -d '{
    "name":"value",
    "address":"value",
    "city":"value",
    "country":"value",
    "phone":"value",        // Not required
    "email":"value"         // Not required
        }' -H "Content-Type: application/json" -H "authorization: <your-token>" -X POST http://localhost:5000/api/companies
```
Returns created company


#### Update company
Requires token

Requires the user to be owner or beneficial owner of the company

Options that are not specified will be omitted from the update. (Example: if no email is specified the company will remain with the previous email)
```
curl -d '{
    "name":"value",         // Not required
    "address":"value",      // Not required
    "city":"value",         // Not required
    "country":"value",      // Not required
    "phone":"value",        // Not required
    "email":"value"         // Not required
        }' -H "Content-Type: application/json" -H "authorization: <your-token>" -X PUT http://localhost:5000/api/companies/:id
```
Returns updated company


#### Delete company
Requires token

Requires the user to be owner of the company
```
curl -H "authorization: <your-token>" -X DELETE http://localhost:5000/api/companies/:id
```
Returns the id of the deleted company


#### Get beneficial owners
```
curl -X GET http://localhost:5000/api/companies/:id/invite
```
Returns an array containing the first name and the last name of all the beneficial owners of the company


#### Add beneficial owners
Requires token

Requires the user to be owner of the company
```
curl -d '{"email":"value"}' -H "Content-Type: application/json" -H "authorization: <your-token>" -X POST http://localhost:5000/api/companies/:id/invite
```
