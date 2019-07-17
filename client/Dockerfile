FROM node:11

# set directory of our app and copy  over package.json and package-lock.json
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .