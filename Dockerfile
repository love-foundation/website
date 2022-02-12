FROM node:16

WORKDIR /app

COPY . .

ENTRYPOINT [ "node" ]
CMD [ "./build" ]
