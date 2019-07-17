# Mevn-app
Basic application made using MEVN (MongoDB/Express/Vue/Node.js) stack. Containarized using Docker. 
The application allows to register and login using email / password. Users are authenticated using JWT tokens. Logged in users can create/update/delete companies and invite other users by using their email.

# Live demo 
https://corporate-moon.herokuapp.com/

# Getting started
## Setup
Before you can use the app you are required to create .env file in the root of the server directory. It needs to contain a secret for your JWT tokens and a connection string to your Mongo database.
```
JWT_SECRET=yourjwtsecret
ATLAS_URI=mongoDbConnectionString
```

## Development with Docker
1. Install docker (https://www.docker.com/)

2. Run ```docker-compose -f docker-compose.dev.yml build```

3. Run ```docker-compose -f docker-compose.dev.yml up```

This should spin up a development server for client side on http://localhost:8080/ and a nodemon server for the server side on http://localhost:5000/.

To stop the containers run ```docker-compose -f docker-compose.dev.yml down```


---DISCLAIMER FOR WINDOWS---
Change port-forward settings in Virtualbox (https://www.jhipster.tech/tips/020_tip_using_docker_containers_as_localhost_on_mac_and_windows.html)
Alternatively you can also edit the dev server url inside of client/vue.config.js. You need to change the target url to the ip address of your docker machine. You can access it running the command ```docker-machine ip```

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

2. Run ```docker-compose -f docker-compose.prod.yml build```
3. Run ```docker-compose -f docker-compose.prod.yml up```




To run in production mode
``` 
cd ./client 
npm run build
``` 
``` 
docker-compose -f docker-compose.prod.yml
```

To deploy to heroku
Create prod container with 
docker-compose -f docker-compose.prod.yml

docker tag <container-id> registry.heroku.com/<app-name>/web
 
docker push registry.heroku.com/<app-name>/web 

heroku container:release --app=<app-name> web  