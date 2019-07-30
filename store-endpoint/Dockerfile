FROM node:lts-alpine
WORKDIR /home/simone/esame
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run-script build
ENTRYPOINT [ "npm", "start" ] 

