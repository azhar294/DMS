FROM node:14.4.0-slim

WORKDIR /opt/app
COPY . .

RUN npm install

EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

CMD  /wait && npm run start
