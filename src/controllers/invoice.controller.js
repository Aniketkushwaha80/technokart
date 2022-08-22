const express = require("express")
const Invoice=require("../models/invoice.product")

const router = express.Router()


// post opration  "api/invoice/invoice_number"
router.post("",async(req,res)=>{
    try{

//  checking invoice data with invoice number that is aloready created or not
// return if exist


        const checkinvoice=await Invoice.findOne({invoice_number:req.body.invoice_number})
        if(checkinvoice){
return res.send("invoice number already registerd")

// if not present so create and aplying all condition
        }else{
           
        

// here we find max invoice number and sort in ass order and storeing in variable....


        const invoicedetailsMax = await Invoice.find({invoice_number:{$gt:req.body.invoice_number}}).sort({invoice_number:1}).limit(1);
		console.log("invoicedetailsMax ",invoicedetailsMax);


// here we find min invoice number and sort in dec order and storeing in variable....

        const invoicedetailsMin = await Invoice.find({invoice_number:{$lt:req.body.invoice_number}}).sort({invoice_number:-1}).limit(1);
		console.log("invoicedetailsMin ",invoicedetailsMin);


// here we store ing max data and min data ...
        if(invoicedetailsMin.length)
		{
			var minDate = new Date(invoicedetailsMin[0].invoice_date);
		}
       
		if(invoicedetailsMax.length)
		{
			var maxDate = new Date(invoicedetailsMax[0].invoice_date);
		}
		
		var invoiceDateInput = new Date(req.body.invoice_date);

// here we creating data if we get our max and min exist and we create if it will lie between 2 dates....

        if(invoicedetailsMax.length && invoicedetailsMin.length)
		{
			console.log("both")
			if(invoiceDateInput.getTime() > minDate.getTime() && invoiceDateInput.getTime() < maxDate.getTime())
			{
				console.log("insde if")
				const invoice=await Invoice.create(req.body)
				return res.send(invoice);
			}
			else{
				return res.send({success:false, msg:'Date is not acceptable'})
			}


            // here we creating data if we dont have our min value  like  0  becouse for any number if
            //  it dont have any min numbert so its min number is 0 zero exist and we create 

		} else if(invoicedetailsMax.length >0 && invoicedetailsMin.length<=0){
			console.log(" Max --> ");
			if(invoiceDateInput.getTime() > maxDate.getTime())
			{
				console.log("insde if")
				const invoice=await Invoice.create(req.body)
				return res.send(invoice);
			}
			else{
				return res.send({success:false, msg:'Date is not dddacceptable'})
			}


            // here we creating data if we dont have our max value  
		}else if(invoicedetailsMax.length <= 0 && invoicedetailsMin.length > 0)
		{
			console.log("min -->");
			if(invoiceDateInput.getTime() > minDate.getTime())
			{
				console.log("insde if")
				const invoice=await Invoice.create(req.body)
				return res.send(invoice);
			}
			else{
				return res.send({success:false, msg:'Date is not xacceptable'})
			}


            // if dont have any  data in our data base or we cr
		}else{
            const invoice=await Invoice.create(req.body)
				return res.send(invoice);
        }


    
        }
        
    }catch(err){
        return res.status(500).send(err.message)
    }



})

// get all data  "api/invoice"

router.get("",async(req,res)=>{
    try{
     
        const invoice=await Invoice.find().lean().exec()
        if(!invoice){
            return res.send("Not Found")
                    }else{
                        return res.send(invoice)
                    }
      

        
    }catch(err){
        return res.status(500).send(err.message)
    }
})



// get opration through invoice number  "api/invoice/invoice_number"

router.get("/:invoice_number",async(req,res)=>{
    try{
     
        const invoice=await Invoice.findOne({invoice_number:req.params.invoice_number})
        if(!invoice){
return res.send("Not Found")
        }else{
            return res.send(invoice)
        }
      
      
        
    }catch(err){
        return res.status(500).send(err.message)
    }
})



// get data between two dates  "api/invoice/date/date1/date2/"

router.get("/date/:date1/:date2",async(req,res)=>{
    try{
     
        var date1=req.params.date1
        var date2=req.params.date2
     
        let query ={invoice_date:{$gte:(date1),$lt:(date2.slice(0,-1))}}
        console.log(query)
        const invoice=await Invoice.find(query)
        if(!invoice){
return res.send("Not Found")
        }else{
            return res.send(invoice)
        }
      
      
        
    }catch(err){
        return res.status(500).send(err.message)
    }
})





// delete opration through invoice number  "api/delete/invoice_number"

router.delete("/delete/:invoice_number",async(req,res)=>{
    try{
     
        const invoice=await Invoice.findOneAndDelete({invoice_number:req.params.invoice_number})
        if(!invoice){
return res.send("Not Found")
        }else{
            return res.send(invoice)
        }
      
      
        
    }catch(err){
        return res.status(500).send(err.message)
    }
})


module.exports=router
