
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const laptopSchema=new Schema({

    company :{

        type : String,
        required : true
    } ,
    model : {

        type : String,
        required : true
    },
    count : {
        type : Number,
        required : true
    }
},{timestamps: true})

const laptopModel= mongoose.model("laptopModel",laptopSchema);


const laptop1=new laptopModel({
    company:"lenovo",
    model: "yoga99",
    count:"100"
})


const laptop2=new laptopModel({
    company:"apple",
    model: "mac book air 14 inch",
    count:"8"
})


// laptop2.save()
//     .then((result)=>{
//         console.log("The sult fo saving a laptop is");
//         console.log(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })



module.exports=laptopModel;
