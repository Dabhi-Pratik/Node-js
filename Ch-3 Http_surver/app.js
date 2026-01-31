import http from "http";

const server = http.createServer((req,res)=>{
    res.end("hello from Server again and again");
})

const port = 5000;

server.listen(port,(err)=>{
    if(err){
        console.log("Error.......!");
    }
    else{
        console.log("successfully......!")
    }
})

