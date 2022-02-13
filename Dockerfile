FROM node:16-alpine

WORKDIR /app

COPY . .

ENTRYPOINT [ "node" ]
CMD [ "./build" ]
