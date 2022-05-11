const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

// 跨域请求中间件
app.use(require('cors')())
//x-www-form-urlencoded解析中间件
app.use(bodyParser.urlencoded({ extended: false }))
//json解析中间件
app.use(bodyParser.json())
//托管静态文件，使其能够被访问
app.use('/uploads', express.static(path.resolve('uploads')))

require('./plugins/db')(app)
require('./routes/admin/index')(app)

app.listen(3000, () => {
  console.log("http://localhost:3000");
})