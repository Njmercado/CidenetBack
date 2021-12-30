FROM node:15-alpine

RUN mkdir -p /src
WORKDIR /src

COPY . .
RUN npm install

ENV PORT=5500

CMD ["npm", "run", "prod"]
