FROM node:alpine

RUN apk update && apk add bash

WORKDIR /frontend

COPY ./frontend .

RUN npm run build
WORKDIR /frontend/build

CMD ["npx","serve","-s"]