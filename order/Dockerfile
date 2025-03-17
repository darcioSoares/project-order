FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
