FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV production
RUN npm run build-storybook

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app /app
RUN npm install -g http-server
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 80 6006

CMD ["http-server", "storybook-static", "-p", "6006"]
