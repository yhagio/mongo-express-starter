With Docker

```bash
# Build container
docker-compose build

# Start app
docker-compose up

# Run test (Not working at the moment)
docker-compose up -f docker-compose.test.yml

# Go inside the container (api), i.e.
docker exec -it mongo-express-starter_api_1 sh

# When you want to reset
docker system prune
docker volume prune
```

Without Docker

```bash
# Install dependencies
yarn # or
npm i

# Start app
npm start:local

# Run test
npm run test:local

# Lint
npm run lint
```

#### Known issue

- [] Running test in docker container does not work
