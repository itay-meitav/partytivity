FROM node:lts-alpine
WORKDIR /app
COPY ["package*.json", "./"]
RUN npm ci
COPY ./ .
EXPOSE 5000
CMD ["npm", "run", "dev"]
