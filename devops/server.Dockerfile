FROM node:10-alpine

WORKDIR /main
COPY ./server/server.js /main
COPY ./server/imageUpload.js /main
COPY ./server/config.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 4001

CMD ["node", "server.js"]