FROM node:alpine

WORKDIR /app

COPY . .

ENTRYPOINT [ "node" ]
CMD [ "/build" ]
