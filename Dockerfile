FROM node:14

COPY . /

RUN npm install && npm run build

EXPOSE $PORT
