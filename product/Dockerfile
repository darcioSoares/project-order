FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

# Copia o restante do código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
