FROM node:18.18-alpine
WORKDIR /opt/fit-friends
COPY ./dist .
RUN npm install --omit=dev
CMD [ "node", "./main.js" ]
