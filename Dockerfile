FROM node:slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Set env vars
ARG SNAG_TOKEN
ENV PORT=8765 VERIFICATION_TOKEN=$SNAG_TOKEN

EXPOSE $PORT
CMD [ "npm", "start" ]
