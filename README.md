#pm2Manage nodejs 服务器进程管理工具 version 0.2.3

pm2 manage  是nodejs的服务器管理工具  
[demo](http://watch.wvovo.com/ "")  
[问题讨论，bug跟踪](http://js.wvovo.com/tags/pm2manage)
目前实现了期监控功能  
##模块依赖
+ angularjs  
+ nodejs
+ less
+ bootstrap
+ 支持IE8+

##功能展望
目前pm2已经开放了操作接口，苦于时间问题一直未能抽空完成，
初步构想是可以建立一个完全
基于nodejs为后端的服务器管理平台，
前端基于angularjs实现的一套完整的管理系统，
如有兴趣可以email: ckken@qq.com  或者留下issue 一起进行开发，构建一个中文nodejs服务器管理工具

##安装方式

1. pm2 web 开通后台数据 
2. 修改 app.js `port` 为 socket service 端口 ； `host` 为 pm2 web 的数据api
3. node app.js 启动socket服务
4. 编辑 app/app.js 修改 `CW.url` pm2 web api ； `CW.socket` Socket service API

##Install & Run
1. `pm2 web` for run pm2 ewb service
2. edit app.js `port` socket service port ; `host` pm2 web api url
3. `node app.js` for run socket service
4. edit app/app.js edit `CW.url` pm2 web api ； `CW.socket` Socket service API
