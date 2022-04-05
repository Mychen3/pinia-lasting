# pinia-lasting


一个基于pinia的插件，自动数据持久化，直接引入就是持久化





# 设计想法

 每次使用vuex或者pinia 数据不能持久化，然后就想写个自动化持久化自己不用写任何代码

 sessionStorage里面永远保持是最新的数据



# 如何使用呢？

## 1、npm安装依赖

```shell

npm install pinia-lasting

```



## 2、使用方式

```js
import { piniaLasting } from 'pinia-lasting'
import {createPinia} from 'pinia'

const pinia = createPinia()

// 注入插件
pinia.use(piniaLasting)


```

