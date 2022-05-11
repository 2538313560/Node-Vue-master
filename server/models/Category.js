const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name : {type: 'string'},
  parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)