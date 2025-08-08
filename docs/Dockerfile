FROM node:22-alpine AS builder
WORKDIR /app

# Accept build arguments
ARG FIGMA_TOKEN

# Copy root package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire monorepo structure
COPY . .

# Build the Moon UI package and generate CSS
WORKDIR /app/packages
RUN npm run build
WORKDIR /app
ENV FIGMA_TOKEN=$FIGMA_TOKEN
RUN node packages/dist/install.js --add-components

# Build Storybook
WORKDIR /app/docs
ENV NODE_ENV production
RUN npm run build-storybook

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/docs/storybook-static ./storybook-static
RUN npm install -g http-server
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 80 6006

CMD ["http-server", "storybook-static", "-p", "6006"]
