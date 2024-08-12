FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh db:3306 -- npm install && npm start"]

# Expõe a porta 3000 para o container
EXPOSE 3000
