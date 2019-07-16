FROM node:11

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 5000 for node
ARG PORT=5000
ENV PORT $PORT
 
# set directory of our app and copy  over package.json and package-lock.json
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i npm@6.10
RUN npm ci --only=production
RUN npm cache verify

# Bundle app source
COPY . .


EXPOSE $PORT

CMD [ "npm", "run", "start" ]