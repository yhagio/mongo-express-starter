FROM node:10.13-alpine
WORKDIR /app
COPY ./package.json ./
RUN apk update && apk upgrade \
  && apk add --no-cache git \
  && apk --no-cache add --virtual builds-deps build-base python \
  && npm i
# && npm rebuild bcrypt --build-from-source \
# && npm rebuild bcrypt --update-binary
COPY . .
CMD ["npm", "run", "start"]