FROM node:16.14-alpine

WORKDIR /app-frontend
COPY package* ./
RUN npm i

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
