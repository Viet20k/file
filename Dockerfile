# Install dependencies only when needed
FROM node:16-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apk add --no-cache libc6-compat libpng-dev libtool g++ make zlib-dev
#RUN rm -rf /var/cache/apk/*

#RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
WORKDIR /app

COPY package*.json ./
#USER node
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000
#RUN yarn build
CMD [ "npm", "run", "dev" ]
