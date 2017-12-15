## node+express+ejs 制作简单社区后端

## 构建应用 
    express --view=ejs one_punch/     (one_punch 为文件名)
    npm install
    npm install express --save
    
## 启动
    node ./bin/www
    (NODE_ENV=production node ./bin/www 这是生产环境启动,没有错误提示...)
    (NODE_ENV=production PORT=8083 node ./bin/www 这是强制8083端口启动...)
    
    
=======
## 用户与帖子接口
    users、topics一系列接口

## MongoDB使用
    https://docs.mongodb.com/
    
## 登录验证
    用户登录和鉴权的重要性不言而喻
    由于HTTP请求无状态的特性，为了节省运算资源，有必要（？）提供一套登录机制，在验证通过后、一段时间内对需要登录的操作放行
    常用的方法有:Session机制，JWT机制和OAuth机制 cookie-session

## Session
    Session，会话。在用户登录后，服务器存储用户会话的相关信息，并为客户端指定一个访问凭证，如果有客户端凭此凭证发出请求，则在服务端存储的信息中取出用户相关登录信息并使用服务端返回的凭证常存储于Cookie中。此时Cookie与SessionStorage和LocalStorgae并无太多不同，是一种存储的载体，本质上来说，存在Cookie中的内容也可以存在别处
    
    基于Session和其他服务器存储凭证的鉴权机制有一个问题，对分布式系统比较不友好
    如果用户的请求会到达两台服务器上，那么如果其中一台没有登录过，鉴权就会失败
    解决这个有数种方法：
    一是存储的数据库是分布式的，访问任意一台机器时，实际上都会从分布式的数据库（数据中心）调取凭证
    二是通过流量分发，保证同一SessionId的用户，每次请求都会到同一台服务器（数据库）上

## JWT
    JWT是一种无状态的鉴权机制。将用户登录后的一些信息（比如用户Id）和过期时间等信息存储在一个加密过的字符串中,当服务器收到请求的时候，进行解密并直接使用信息
    JWT的组成：使用base64编码描述jwt的头部、使用base64编码的payload，以及加密签名
    我们将使用jsonwebtoken模块管理JWT
    缺点，服务器无法像session一样方便地管理用户登录状态

## 登录
    明文存储用户密码是一件很幼稚、很不正规的事情，包括CSDN在内的一系列组织都出现过大量用户账号密码泄露的事故，如果明文存储密码，画美不看我们使用Node.js自带的crypto模块，加密用户的密码，在登录时取出密码进行比对
    
    

