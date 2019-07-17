FROM node:11

WORKDIR /usr/src/app
COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; \
	then npm install;  \
	else npm install --only=production; \
	fi

# Bundle app source
COPY . .