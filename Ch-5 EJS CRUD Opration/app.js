// import express from "express"

// const app = express();

// app.set("view engine","ejs")

// app.get("/",(req,res)=>{
//     res.render("index1")
// })

// const port = 5000;

// app.listen(port,()=>{
//     console.log("Server running on port ",port)
// })



import express from "express"

const app = express();

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let studentList = [
    {
        id:1,
        name:"Pratik"
    },
    {
        id:2,
        name:"Brij"
    }
]

app.get("/",(req,res)=>{
    res.render("index2",{studentList})
})

app.get("/add",(req,res)=>{
    res.render("add");
})

app.post("/add",(req,res)=>{

    const { name }=req.body

    const newStudent = {
        id: new Date().getTime(),
        // console.log("name",name),
        name
        
    }
    

    studentList.push(newStudent);
    res.redirect("/")
})

const port = 5000;

app.listen(port,()=>{
    console.log("Server running on port ",port)
})