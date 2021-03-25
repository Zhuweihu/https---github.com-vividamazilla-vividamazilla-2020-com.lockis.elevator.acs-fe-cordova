const Mock = require('mockjs')
const JSON5 = require('json5')
const fs = require('fs')
const path = require('path')

function getJsonFile(filePath) {
    var json = fs.readFileSync(path.resolve(__dirname,filePath),'utf-8')
    return JSON5.parse(json)
}
module.exports = function(app) {
    if(process.env.MOCK == 'true') {
        // if(true) {
        app.get('/user/userinfo',function(rep,res) {
            var json = getJsonFile('./userinfo.json5')
            res.json(Mock.mock(json))
            // res.json(Mock.mock({id:'@id'}))
            // res.json(json)
            
        })
        app.get('/miscellaneous/categor',function(rep,res) {
            var json = getJsonFile('./category.json5')
            res.json(Mock.mock(json))
            // res.json(Mock.mock({id:'@id'}))
            // res.json(json)
            
        })
    }
}