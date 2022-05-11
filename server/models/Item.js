const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name : {type: 'string'},
  icon : {type: 'string'},
})

module.exports = mongoose.model('Item', schema)