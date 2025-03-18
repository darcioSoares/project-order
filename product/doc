docker exec -it minha_api bash

docker logs -f minha_api


docker exec -it minha_api sh
tail -f /app/logs/app.log  

docker exec minha_api npm run typeorm migration:run

api correios
https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo

docker compose down
docker compose up -d --build



Migrations
npm run typeorm migration:create src/database/migrations/CreateUsersTable
npm run typeorm migration:run -- -d ./src/database/data-source.js
npm run typeorm migration:revert -- -d ./src/database/data-source.js // reverte apenas a ultima migração
npm run typeorm migration:show -- -d ./src/database/data-source.ts

chmod -R 777 /app/src/database/migrations


microsserviço CRUD de produtos com controle de estoque simples