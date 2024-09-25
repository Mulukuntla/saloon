const http=require('http')
const fs=require('fs')
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers)
    const url=req.url
    const method=req.method
    
    if(url==='/'){
        fs.readFile('message.txt',{encoding:"utf-8"},((err,data)=>{
            if(err){
                console.log(err)
            }
            res.write('<html>')
            res.write('<head><title>Enter Message</title></head>')
            res.write(`<body>${data}</body>`)
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
            res.write('</html>')
            return res.end()

        }))
        
    }
    if(url==='/message' && method==='POST'){
        const body=[]
        req.on('data',(chunk)=>{
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString()
            const message1=parsedBody.split('=')[1]
            let message=""
            for (let i=0;i<message1.length;i=i+1){
                if(message1[i]==='+'){
                    message=message+" "

                }
                else{
                    message=message+message1[i]
                }
            }
            console.log(message)
            fs.writeFile('message.txt',message,(error)=>{
                if(error){
                    console.log(error)
                }
                res.statusCode=302
                res.setHeader('Location','/')
                return res.end()

            })
            
        })
        
    }
    
   
    

    
    
    

})
server.listen(4000)