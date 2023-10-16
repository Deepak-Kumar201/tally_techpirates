FROM node:19.5.0-alpine
WORKDIR /home/client
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000