FROM node:10-alpine AS build-env
WORKDIR /out
COPY package.json .
RUN npm i
COPY . .
RUN npm run-script build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-env /out/dist/frontend .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80