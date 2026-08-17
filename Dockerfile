FROM node:24-alpine

WORKDIR /app

COPY . .

ENTRYPOINT [ "node" ]
CMD [ "./build" ]
