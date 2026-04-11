FROM node:25.9.0-alpine3.23 AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

ARG VITE_API_URL
ARG VITE_API_KEY
ARG VITE_BASE_PATH

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY
ENV VITE_BASE_PATH=$VITE_BASE_PATH

COPY . .
RUN yarn build

FROM nginx:1.28.3-alpine3.23
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
