const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const mobileSchema=new Schema({

    company:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    model:{
        type:String,
        required:true
    }
})

const mobileModel= mongoose.model("mobileModel",mobileSchema);

module.exports=mobileModel;


const mobile1= new mobileModel({
    company:"Nokia",
    count:5,
    model:"Xperia"
})

const mobile2=new mobileModel({
    company:"samsung",
    count:1,
    model:"z fold 5"
})

const mobile3=new mobileModel({
    company:"iphone",
    count:7,
    model:"14 pro"
})

// mobile2.save()
//     .then((result)=>{
//         console.log("1 mobile has been added");

//     })
//     .catch((err)=>{
//         console.log(err);
//     })

//     mobile3.save()
//     .then((result)=>{
//         console.log("1 mobile has been added");

//     })
//     .catch((err)=>{
//         console.log(err);
//     })

