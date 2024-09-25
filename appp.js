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
            const message=parsedBody.split('=')[1]
            fs.writeFile('message.txt',message,(error)=>{
                res.statusCode=302
                res.setHeader('Location','/')
                return res.end()

            })
            
        })
        
    }
    res.setHeader('Content-Type', 'text/html'); // Set default content type
    res.write('<html>');
    res.write('<head><title>Home Page</title></head>');
    res.write('<body><h1>Welcome to the Home</h1></body>');
    res.write('</html>');
    res.end();
   
    

    
    
    

})
server.listen(4000)