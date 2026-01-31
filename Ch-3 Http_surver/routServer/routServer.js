import http from "http";

const server = http.createServer((req,res)=>{
    if(req.url === "/"){
        res.end("This is Homepage...")
    }else if(req.url === "/about"){
        res.end("This is about page");
    }else{
        res.end("Page not Found....!")
    }
})  

const port = 5000;

server.listen(port,(err)=>{
    if(err){
        console.log("Error....!")
    }else{
        console.log("Server running on Port",port)
    }
})