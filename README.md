# MEVN-app
Application made using MEVN (MongoDB Cloud/Express/Vue/Node.js) stack. Containarized using Docker. 

The application allows to register and login using email / password. Users are authenticated using JWT tokens. Logged in users can create/update/delete companies and invite other users to become beneficial owners.

## Live demo 
https://corporate-moon.herokuapp.com/


# Getting started
## Setup
Before you can use the app you need to initialize the environment variables. To do that create .env file in the root of the server directory. It needs to contain a secret for your JWT tokens (JWT_SECRET) and a connection string to your Mongo cloud database (ATLAS_URI).
```
JWT_SECRET=yourjwtsecret
ATLAS_URI=mongoDbConnectionString
```

## Development with Docker
1. Install docker (https://www.docker.com/)

2. Run ```docker-compose -f docker-compose.dev.yml build```. This will create images for our client and server.

3. Run ```docker-compose -f docker-compose.dev.yml up```. This will host our images inside a docker container. After this step you should be able to access the client development server on http://localhost:8080/ and nodemon server for service side development on http://localhost:5000/.

To stop the containers run ```docker-compose -f docker-compose.dev.yml down```
To rebuild containers run ```docker-compose -f docker-compose.dev.yml build```

---DISCLAIMER FOR WINDOWS---
To access docker containers through localhost you are required to [change port-forwarding settings in Virtualbox](https://www.jhipster.tech/tips/020_tip_using_docker_containers_as_localhost_on_mac_and_windows.html).

## Development locally
1. Server side development server
```
cd server
npm install
npm run dev
```

2. Client side development server
```
cd client
npm install
npm run serve
```

# Production and deployement to heroku
1. Build the client side code. It will build it inside the server/public folder
```
cd client
npm run build
```
2. Create an image to be used for production ```docker-compose -f docker-compose.prod.yml build```
3. List all the images ```docker image ls```
4. Find the image created and run the following command ```docker tag <image-id> registry.heroku.com/<app-name>/web``` to register the image with Heroku.
4. Run ```docker push registry.heroku.com/<app-name>/web ``` to push the image
5. Run ```heroku container:release --app=<app-name> web``` to release your application.
