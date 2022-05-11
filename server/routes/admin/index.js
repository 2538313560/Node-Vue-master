module.exports = app => {
  const express = require('express');
  const path = require('path');

  const router = express.Router({
    mergeParams: true,
  });

  // 新建列表
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 通过id更新数据
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 通过id删除数据
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: 'true'
    })
  })

  //获取详情列表，获取十条
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  // 通过id查找数据
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    //制作中间件，把复数形式的参数转换为单数和首字母大写的类名
    const modelName = require('inflection').classify(req.params.resource)
    //把数据库模型地址，赋值到req
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)


  // 获取图片数据中间件
  const multer = require('multer')
  const upload = multer({ dest: path.resolve('uploads') })
  // 装备图标上传接口
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}