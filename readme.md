# Redirect-check API-Server

Runs a fastify-server with one route "/v1/check-redirect", which checks if a given domain/path redirects to the desired location.

run the server:

```bash
npm start
node server.js
```

create and run with docker:

```bash
docker build -t redirect-check-api .
docker run -p 5000:5000 redirect-check-api
```
