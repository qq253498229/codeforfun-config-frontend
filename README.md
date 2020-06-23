# DemoConfigFrontend

文档地址: [Spring Cloud 配置中心](https://consolelog.gitee.io/docker-config-server-all-in-one/)

官方文档: [官方文档](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.3.RELEASE/reference/html/) 、 [中文版](https://consolelog.gitee.io/docs-config/)

参数名 | 默认值 | 说明
---|---|---
BACKEND_PATH | 8888 | 后端暴露的端口


```bash
docker run -d -p 80:80 --name config-server-frontend \
-e BACKEND_PATH=http://host.docker.internal:8888 \
registry.cn-beijing.aliyuncs.com/codeforfun/config-server-frontend:1.0.2
```

docker run -it \
registry.cn-beijing.aliyuncs.com/codeforfun/config-server-frontend:1.0.2
