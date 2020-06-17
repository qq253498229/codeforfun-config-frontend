FROM node:13.10.1-alpine
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
ENV TZ=Asia/Shanghai
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && apk add tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

ENV BACKEND_PATH=http://config:8888

RUN echo "server { \
    listen       80; \
    server_name  localhost; \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    location /api { \
      proxy_pass $BACKEND_PATH; \
    } \
    location / { \
      try_files \$uri \$uri/ /index.html; \
    } \
    error_page   500 502 503 504  /50x.html; \
    location = /50x.html { \
        root   /usr/share/nginx/html; \
    } \
}" > /etc/nginx/conf.d/default.conf

COPY --from=0 /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
