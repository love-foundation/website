FROM node:alpine

WORKDIR /app

COPY ./package.json .
RUN yarn install --prod

ENTRYPOINT [ "yarn" ]
CMD [ "run", "start" ]