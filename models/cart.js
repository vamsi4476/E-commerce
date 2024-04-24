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

const cartSchema1=new Schema({

    product_id:{
        type:String,
        require:true
    },
    purchase_count:{
        type:Number,
        require:true
    },

    product_name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    }

})

const cartModel=new mongoose.model('cartModel',cartSchema,'cartmodels');

//const cartModel1=new mongoose.model('cartModel1',cartSchema1,'cartmodels');

// var users = mongoose.model('User', loginUserSchema, 'users');
// var registerUser = mongoose.model('Registered', registerUserSchema, 'users');
// This saves both the schemas in users collection.


module.exports=cartModel;

// const cart1=new cartModel1({
//     product_id:"ne_id",
//     purchase_count:4,
//     product_name:"lenovo(laptop)",
//     username:"test_username11"
// })


// cart1.save()
//     .then((result)=>{
//         console.log("1 item has been added to the cart")
//         console.log(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })