FROM node:6.10-alpine
RUN mkdir -p /var/www/
WORKDIR /var/www/
COPY package.json /var/www/
RUN npm install --only=production
COPY . /var/www/
CMD [ "npm", "start" ]
