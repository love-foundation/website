FROM node:alpine

WORKDIR /app

COPY . .

ENTRYPOINT [ "node" ]
CMD [ "svelte-kit build" ]
