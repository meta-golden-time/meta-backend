FROM node:latest
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]