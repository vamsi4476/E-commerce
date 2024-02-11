const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const usersSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    }
    
},{timestamps: true})

const User = mongoose.model('User',usersSchema);

module.exports=User;

// const first_user={
//     username:"Vamsi",
//     password:"Vamsi449"
// }

//const user= new User(first_user);


// User.findById("1")
//     .then((result)=>{
//         if(result==null){
//             user.save()
//     .then((result)=>{
//         console.log("The user has been saved");
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
//         }
//         else{
//             console.log("Trying to insert first_user that is already present")
//         }
//     })
//     .catch((err)=>{
//         console.log(err);
//     })


// Creating a Schema automatically creates a Collection in the database.



