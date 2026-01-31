import http from "http"

const server = http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"text/html"})

    res.end("<h1>Hello From Server again</h1>")
})

const port = 5001;

server.listen(port,()=>{
    console.log("Server running on port",port);
})