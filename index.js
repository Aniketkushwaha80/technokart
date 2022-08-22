const express = require("express");
var cors = require('cors')
const connect = require("./src/configs/db");

// const userProduct = require("./models/user.product");
const invoiceController=require("./src/controllers/invoice.controller")


const app = express();
app.use(cors({ origin:"*"}))


app.use(express.json());


app.use("/invoice", invoiceController);


app.set("view engine","hbs")
app.get("/",(req,res)=>{
  res.render("index")
})

const PORT=process.env.PORT || 2345

app.listen(PORT, async () => {
  try {
    await connect();
  } catch (err) {
    console.error(err.message);
  }
  console.log("listening on port 2345");
});
