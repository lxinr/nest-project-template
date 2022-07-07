

# nest-project-template
## Description

可用于快速搭建一个[NestJS 8](https://nestjs.com/)项目

## Project structure

  ```bash
  ├─src
    ├─config        // 配置文件
    ├─middlewares   // 中间件
      └─logger      // 日志中间件
    ├─modules       // 模块
      └─logger      // 日志模块
    ├─types         // 声明文件
    └─utils         // 工具方法
  ├─.env.xxx        // 环境变量配置文件
  ```

## Getting started

```bash
# cloning this project on your workstation
$ git clone https://github.com/lxinr/nest-project-template.git my-project

$ cd ./my-project

$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# debug mode
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
