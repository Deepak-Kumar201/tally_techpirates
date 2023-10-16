FROM node:19.5.0-alpine
WORKDIR /home/server
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 5000