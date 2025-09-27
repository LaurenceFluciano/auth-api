FROM node:latest
WORKDIR /api
COPY . .

RUN rm -rf node_modules dist coverage
RUN npm i

CMD ["npm","run","start"]

EXPOSE 8000