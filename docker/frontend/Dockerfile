FROM node:alpine

RUN apk update && apk add bash

WORKDIR /frontend

COPY ./frontend .

RUN npm config set legacy-peer-deps true
RUN npm install

COPY /docker/frontend/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT [ "/entrypoint" ]