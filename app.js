const http=require('http')
const server=http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers)
    res.setHeader('Content-Type', 'text/html'); // Set default content type

    if (req.url === '/home') {
        res.write('<html>');
        res.write('<head><title>Home Page</title></head>');
        res.write('<body><h1>Welcome to the Home</h1></body>');
        res.write('</html>');
        res.end();
    } else if (req.url === '/about') {
        res.write('<html>');
        res.write('<head><title>About Page</title></head>');
        res.write('<body><h1>Welcome to about us page</h1></body>');
        res.write('</html>');
        res.end();
    } else if (req.url === '/node') {
        res.write('<html>');
        res.write('<head><title>Node js pade</title></head>');
        res.write('<body><h1>Welcome to my Node.js Project</h1></body>');
        res.write('</html>');
        res.end();
    

    
    }
    

})
server.listen(4000)