FROM node:20-alpine

WORKDIR /app

COPY . .

ENTRYPOINT [ "node" ]
CMD [ "./build" ]
