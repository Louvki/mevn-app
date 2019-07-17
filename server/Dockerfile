FROM node:11

WORKDIR /usr/src/app
COPY package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
	then npm install;  \
	else npm install --only=production; \
	fi

CMD  ["npm", "run", "start"]

# Bundle app source
COPY . .