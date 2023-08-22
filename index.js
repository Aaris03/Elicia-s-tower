const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) =>{
    res.send("Hello")
})

app.post("/elicia-tower/")

app.listen(8080, () => {
    console.log("El servidor esta activo")
})