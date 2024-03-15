FROM node:18-bullseye-slim

WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=5000
ENV NODE_ENV=production
ENV FRONTEND_URL="http://localhost:3000"

COPY . ./

RUN npm ci

EXPOSE 5000

CMD ["node", "server.js"]
