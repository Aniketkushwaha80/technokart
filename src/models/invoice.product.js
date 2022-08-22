const mongoose = require("mongoose");


const InvoiceSchema = new mongoose.Schema(
  {
   
    invoice_date: { type: Date, required: true },
    invoice_number: { type: Number, required: true ,unique:true},
    invoice_ammount: { type: Number, required: true },
    
  },
  {
    versionKey: false,
    
  },

);

module.exports=mongoose.model("invoice",InvoiceSchema)