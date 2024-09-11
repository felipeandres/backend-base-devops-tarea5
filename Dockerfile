FROM node:20.11.1-alpine3.19

WORKDIR /usr/src/app

COPY ./src ./src
COPY ./package*.json ./

RUN npm install --production

EXPOSE 3001

# Comando para ejecutar la aplicación
CMD [ "npm", "run", "dev" ]
