import http from "http"
import fs from "fs"

const server = http.createServer((req,res)=>{
    fs.readFile("index.html",(err,data)=>{
        if(err){
            res.writeHead(404);
            res.end("File not Founded.......!")
        }else{
            res.writeHead(200,{"content-type":"text/html"})
            res.end(data)
        }
    })
})

const port = 5001;

server.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Server running on port",port)
    }
})

