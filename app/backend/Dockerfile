FROM node:16.14-alpine

WORKDIR /app-backend
COPY package* ./
RUN npm i

COPY . .
RUN npm run build

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]
