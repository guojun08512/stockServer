需要先下载node环境
## 官网地址
```
http://nodejs.cn/
```
## 下载地址
```
http://nodejs.cn/download/
```
## 框架
```
koa2
```
## 使用说明
```
git clone xxx
cd xxx
npm i 
npm run start
```
## Docker 安装 Redis 并开启持久化
```
https://blog.csdn.net/diyiday/article/details/77619979
```
## 数据库 mysql 
```
依赖库
sequlize
```
# V1 Api
## version
```
request({
    uri: `${host}/version`,
    method: 'GET',
})

response ->
{
    body: {
        version,
        code,
        message,
        data,
    }
}
```

[返回顶部](#v2-api)