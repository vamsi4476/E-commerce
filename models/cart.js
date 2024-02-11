const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const cartSchema=new Schema({

    product_id:{
        type:String,
        require:true
    },
    purchase_count:{
        type:Number,
        require:true
    },
    username:{
        type:String,
        require:true
    }
})

const cartModel=new mongoose.model('cartModel',cartSchema);

module.exports=cartModel;

const cart1=new cartModel({
    product_id:"test_id",
    purchase_count:2,
    username:"test_username"
})

// cart1.save()
//     .then((result)=>{
//         console.log("1 item has been added to the cart")
//     })
//     .catch((err)=>{
//         console.log(err)
//     })