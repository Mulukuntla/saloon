const path=require('path')
const rootdir=require('../util/path')
exports.get404=(req,res,next)=>{
    res.status(404).sendFile(path.join(rootdir,'views','404.html'))
}