FROM node:13.10.1-alpine
WORKDIR /app
RUN npm config set registry https://registry.npm.taobao.org
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.0-alpine
ENV TZ=Asia/Shanghai
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && apk add tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

ENV BACKEND_PATH=http://config-server:8888

RUN mkdir -p /etc/nginx/templates && echo $'server { \n\
   listen       80; \n\
   server_name  localhost; \n\
   root /usr/share/nginx/html; \n\
   index index.html index.htm; \n\
   location /api { \n\
     proxy_pass ${BACKEND_PATH}; \n\
   } \n\
   location / { \n\
     try_files $uri $uri/ /index.html; \n\
   } \n\
   error_page   500 502 503 504  /50x.html; \n\
   location = /50x.html { \n\
       root   /usr/share/nginx/html; \n\
   } \n\
}' > /etc/nginx/templates/default.conf.template

COPY --from=0 /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
