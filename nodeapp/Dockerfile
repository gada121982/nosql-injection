FROM node:10-alpine

RUN apk update &&  rm -rf /var/cache/apk/*

WORKDIR /app/src

COPY package*.json ./

RUN npm install -g pm2 && pm2 install pm2-logrotate && npm install  && npm cache clean --force

COPY . .
  
EXPOSE 8000

CMD ["pm2", "start", "index.js","--name","node-app","--no-daemon", "--log-date-format='MM-DD hh:mm:ss.SSS A'"]
