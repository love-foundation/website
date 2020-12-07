FROM node:alpine

WORKDIR /app

COPY . .

ENTRYPOINT [ "node" ]
CMD [ "__sapper__/build" ]
