# 哗啦啦新版移动 Web 站点前端项目

代码仓库 Git 地址：

http://git.hualala.com/mendian/hualala-client-touch.git

**注意**：部署时，不同的环境请使用与之对应的 git 分支。

## 分支

- master: 主分支，对应线上环境 m.hualala.com
- dohko: 测试分支，对应 dohko 环境 dohko.m.hualala.com
- mu: 开发分支，对应 mu 环境 mu.m.hualala.com

## 框架构成

- 前端语言和框架：VueJS 2.x + ES6 + CSSNext
- NodeJS 端：ExpressJS + VueJS 服务端渲染
- 构建工具：Webpack + Babel + PostCSS

## 已支持业务

- 旧版微商城模块（/mall/...）
- 新版微商城模块（/buy/...）
- 电子发票模块（/receipt/...）
- 云预订模块（/corder/...）
- 支付模块（/order/pay-...）

## 目录结构

**注意**：关键目录下都有对应的 Readme 文件。

```
hualala-client-touch/
--.gitignore    // Git需要忽略的目录和文件配置
--README.md     // 说明文件
--logs/         // log4js 日志
--pm2/          // pm2 日志
--build/        // webpack 配置文件
--src/          // 源代码
--webroot/      // 此目录及其子目录、文件将在构建后自动生成
----js/
----css/
----img/
...

```

## 先决条件

- 安装 Nginx
- 安装最新稳定版 NodeJS 和 npm
- 通过 npm 全局安装 NodeJS 进程管理和监控工具 PM2

```
$ npm install pm2 -g
```

## 域名

- 线上环境：m.hualala.com
- 测试环境：dohko.m.hualala.com
- 开发环境：mu.m.hualala.com

还是在原来的哗啦啦 m 站点的各种环境域名下，只是后端 url 的 path 路由规则需要重写。


## nginx 路由规则

**注意**：这里的 nginx 配置是整个 m 站点的配置，包括 hualala-client-touch 和 hualala-fe-touch 两个项目。

以下是在 windows 系统上运行的一个**非完整** nginx.conf 配置示例，
部署时运维需要根据实际环境进行最佳实战配置。
比如，服务端缓存、客户端缓存、负载均衡等。
**强烈建议 gzip_comp_level 的值设置为 5 。**
此 nginx.conf 配置示例的重点是 server 下 location 部分的配置，
是 hualala-client-touch 和 hualala-fe-touch 两个项目在同一个域名下路由和转发规则的关键。

```
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    
    keepalive_timeout  65;

    gzip on;
    gzip_http_version  1.1;
    gzip_comp_level    5;
    gzip_min_length    256;
    gzip_proxied       any;
    gzip_vary          on;
    gzip_types
        application/javascript
        application/json
        application/x-font-ttf
        application/xhtml+xml
        application/xml
        font/opentype
        image/svg+xml
        image/x-icon
        text/css
        text/plain;
        #text/html is always compressed by HttpGzipModule

    server {
        listen       80;
        server_name  localhost;

        access_log  logs/host.access.log  main;
        
        # 处理静态资源
        # 处理静态资源是 nginx 的优势，建议不代理转发
        # 如果 nginx 与站点代码在同一台机器上，可以进行如下配置
        # 否则只能进行代理转发
        
        ## hualala-client-touch 项目静态资源
        location ~ ^/(js|css|img)/ {
            # 添加一些必要的头部信息
            # 根据运维经验使用最佳设置
            #expires 1y;
            access_log off;
            
            # 开启静态资源强缓存
            add_header Cache-Control "max-age=31536000, public";
            # 示例，须根据 hualala-client-touch 项目实际的物理路径设置 root
            root d:/hualala-client-touch/webroot;
            # 本地开发时请使用代理转发
            #proxy_pass http://127.0.0.1:8080;
        }
        
        ## hualala-fe-touch 项目静态资源
        location ~ ^/(affixes|assets)/ {
            # 添加一些必要的头部信息
            # 根据运维经验使用最佳设置
            
            # 开启静态资源强缓存
            add_header Cache-Control "max-age=31536000, public";
            #root d:/Develop/hualala-fe-touch/WebRoot;
            # 示例，须根据实际 origin 转发
            proxy_pass http://127.0.0.1:8090;
        }
        
        ## m 站点的商城和电子发票**页面**请求转发给 hualala-client-touch 项目的 NodeJS 服务器处理
        location ~ ^/(mall/|receipt/|corder/|buy/|order/pay-)/.+\.htm.*$ {
            # 添加一些必要的头部信息
            # 根据运维经验使用最佳设置
            proxy_set_header Host $host;
            # 示例，商城页面转发地址，须根据实际 origin 转发
            proxy_pass http://127.0.0.1:8080;
        }
        
        # m 站点以 /api 开头的 ajax 服务调用转发
        location ~ ^/api/.+ {
            # 添加一些必要的头部信息
            # 根据运维经验使用最佳设置
            proxy_set_header Host $host;
            # 示例，服务调用转发地址，须根据后端服务器实际地址转发
            proxy_pass http://127.0.0.1:8888;
        }
        
        # 其它请求转发给 hualala-fe-touch 项目的 Tomcat 服务器处理
        location ~ / {
            proxy_set_header Host $host;
            # 示例，须根据实际 origin 转发
            proxy_pass http://127.0.0.1:8090;
        }

    }
}

```

## 构建和运行

```bash
$ cd ./

# 构建并运行本地开发环境，可以监测代码改动并实时编译
$ npm run local

# 本地构建并运行，代码没有压缩和优化
$ npm run _mu

# 本地构建并运行，代码压缩和优化
$ npm run _dohko

# 构建并运行 dohko 和 线上 环境
$ bash npmrun.sh

```

## 其它文档和 Wiki

参见此项目 [Wiki](http://git.hualala.com/mendian/hualala-client-touch/wikis/pages)













