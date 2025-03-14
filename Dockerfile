FROM node:latest as debug

WORKDIR /work/

COPY ./package.json /work/package.json
RUN npm install

ADD ./ /work/src/
WORKDIR /work/src/
# ENTRYPOINT [ "nodemon","./src/app.js" ]
CMD [ "npm", "run", "dev" ]