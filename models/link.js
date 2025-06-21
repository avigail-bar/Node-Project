const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  timestamp: {type:Date, default:Date.now},
  ip: String,
  targetParamValue:String
});

const targetingRuleSchema = new mongoose.Schema({
  type: String, // לדוג' 'country', 'hour', 'device'
  value: String, // לדוג' 'IL', 'mobile', '8-12'
  targetUrl: String
}); 

const targetValueSchema=new mongoose.Schema({
  name:String,
  value:String,
  targetUrl:String
})

const linkSchema = new mongoose.Schema({
  originalUrl: String,
  clicks: [clickSchema],
  targetingRules:[targetingRuleSchema],
  targetParamName:{type:String,default:"t"},
  targetValues:[targetValueSchema]
});

module.exports = mongoose.model('Link', linkSchema);