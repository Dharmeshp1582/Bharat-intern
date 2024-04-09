var express = require("express"); 
var bodyParser = require("body-parser"); 
var mangoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ 
    extended: true 
})); 

mongoose.connect('mongodb://localhost:8080/MoneyList')
var db = mongoose.connection 
db.on('error',()=> console.log("Error is connecting to Databse"))
db.onjce('open',()=> console.log("connected to Databse"))

app.post("/add",(req,res)=>{
    var category_select = req.body.category_select 
    var amount_input = req.body.amount_input
    var info = req.body.info
    var date_input = req.body.date_input

    var data =  {
              "category": category_select ,
              "Amount": amount_input  ,
              "info" : info,
              "Date": date_input
    }
    db.collection('users').insertOne(data,(err,collection)=>{ 
          if(err){
            throw err;
          }
          console.log("Record inserted successfully")
    })
})
app.get("/", (req, res) =>{
      res.send({
        "Allow-access-Allow-Origin": "*"
      })
      return res.redirect('index.html')
    //res.send("successfully connected to 5000")
}).listen(5000)

console.log("listening on port 5000")
