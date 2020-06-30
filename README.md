# DemoConfigFrontend

文档地址: [Spring Cloud 配置中心](https://consolelog.gitee.io/docker-config-server-all-in-one/)

官方文档: [官方文档](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.3.RELEASE/reference/html/) 、 [中文版](https://consolelog.gitee.io/docs-config/)

参数名 | 默认值 | 说明
---|---|---
BACKEND_PATH | http://config-server:8888 | Nginx后端映射地址

`start command`
```bash
docker run -d -p 80:80 --name config-server-frontend \
-e BACKEND_PATH=http://host.docker.internal:8888 \
registry.cn-beijing.aliyuncs.com/codeforfun/config-server-frontend:1.0.4
```

`stop command`
```bash
docker rm -f config-server-frontend
```

`log command`
```bash
docker logs -f config-server-frontend
```

`docker-compose.yml`
```yaml
version: "3"
services:
  config-front:
    image: registry.cn-beijing.aliyuncs.com/codeforfun/config-server-frontend:1.0.4
    container_name: config-server-frontend
    environment:
      BACKEND_PATH: http://host.docker.internal:8888
    ports:
      - "80:80"
networks:
  default:
    external:
      name: local
```
