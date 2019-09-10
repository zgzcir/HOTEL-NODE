const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const upload = (req, res, next) => {
  let form = new formidable.IncomingForm()
  let imgUrl = ''
  form.encoding = 'utf-8'
  form.keepExtensions = true 
  const rootPath = path.join(__dirname, './../public/images')
  form.uploadDir = rootPath
  form.parse(req, (err, fields, files) => {rootPath + `/${files.file.name}`
    fs.rename(files.file.path, rootPath + `/${files.file.name}`, (err) => {
      if(err) {
        console.log(err)
      }
      imgUrl = rootPath + `/${files.file.name}`
      return res.send({
        url: imgUrl,
        message: 'upload success'
      })
    })
    if (err) {
      return res.status(422).send({
        message: '图片上传失败'
      })
    }
  })
}
module.exports = upload