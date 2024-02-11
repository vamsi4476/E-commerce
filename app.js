// Express Connection..........

const express=require('express');

const app= express()

const path = require('path');

const morgan =require('morgan');

app.use(morgan('dev'));

  // Port Number.............

app.set('view engine','ejs');

//app.use(express.static('public'));

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // for post submits


const mongoose=require('mongoose')

const dbURI='mongodb+srv://vamsi4476:gundavamsi01@nodetuts.w5rxfzn.mongodb.net/E-commerce'


// Importing Users Model from users.js.............
const User=require('./models/users')
const mobileModel=require('./models/mobiles')
const cartModel=require('./models/cart')

mongoose.connect(dbURI)
    .then((result)=>{
        console.log("connected to database")
        app.listen(3300); // Database Connection................
        console.log("Server is listening")
    })
    .catch((err)=>{
        console.log(err);
    })


    // Sessionss....................
    const session = require('express-session')

    const mongodbSession=require('connect-mongodb-session')(session);

    const store= new mongodbSession({
        uri:dbURI,
        collection: "mySessions"
    })

    app.use(session({
        secret:"key", // ket that will sign our cookie
        resave: false, 
        saveUninitialized:false,
        store:store,

    }))

    const isAuth = (req,res,next)=>{
        if(req.session.isAuth){
            next()
        }
        else{
            res.redirect('/')
        }

    }


app.get('/home',isAuth,(req,res)=>{
    
    console.log(req.session);

    res.render('home',{username:req.session.username})
})

app.post('/home_form', (req,res,next)=>{

    // Assuming only signin button is present for now
    let matchFound = false; // Variable to track if a matching user is found
    
    if(req.body.action=="signin"){
    User.find()
        .then((result)=>{
            result.forEach((item)=>{
               const user_name = item.username;
               if(user_name==req.body.username){
                
                    if(item.password==req.body.password){
                       matchFound=true;
                       req.session.username = user_name;
                      
                    }
                    
               }
            })

            if(matchFound){
                req.session.isAuth=true;
                
                res.redirect('home');
            }
            
            else{
            res.render('index',{p_tag:"Invalid Username/Password"})
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    else{
        User.find()
        .then((result)=>{
            result.forEach((item)=>{
               
               if(item.username==req.body.username){
                
                       matchFound=true;
               }
            })
            if(matchFound){
                res.render('index',{p_tag:"Username already exists"})
            }
            else{

                const new_user={
                    username:req.body.username,
                    password:req.body.password
                }

                const new_user_var=new User(new_user);

                new_user_var.save()
                    .then((result)=>{
                            console.log("new_user is added from index page")
                            console.log(result)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    req.session.isAuth=true;
                    req.session.username = req.body.username;
                    res.redirect('home');
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    }

})



app.get('/',(req,res)=>{
    res.render('index',{p_tag:""});
})

app.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        
        res.redirect('/')
    })
})

app.get('/products/mobiles',(req,res)=>{

    mobileModel.find()
        .then((result)=>{
            console.log(result)
            res.render('mobiles',{mobiles:result,username:req.session.username})
        })
        .catch((err)=>{
            console.log(err)
        })
    
})

app.post('/products/mobiles/add',(req,res)=>{

    //  const {mobileId}=req.body;

    // mobileModel.findById(mobileId)
    //     .then((result)=>{
    //         result.count--;
    //         result.save()
            
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })

 })

 app.post('/products/mobiles/less',(req,res)=>{

//     const {mobileId}=req.body;

//    mobileModel.findById(mobileId)
//        .then((result)=>{
//            result.count++;
//            result.save()
           
//        })
//        .catch((err)=>{
//            console.log(err);
//        })

})


app.post('/products/add_to_cart',(req,res)=>{

    const product_id=req.body.productId;
    const purchase_count=req.body.purchases_number;
    const username=req.body.username;
    const product_type=req.body.product_type;

    const cart_item=new cartModel({
        product_id:product_id,
        purchase_count:purchase_count,
        username:username
    })

    cart_item.save()
        .then((result)=>{
            console.log(`${username} has added and item to cart`);
        })
        .catch((err)=>{
            console.log(err);
        })

        if(product_type=="mobile"){
            mobileModel.findById(product_id)
                .then((result)=>{
                    result.count=result.count-purchase_count;
                    result.save()
                })
                .catch((err)=>{
                    console.log(err)
                })
        }

        res.redirect('mobiles')
})


//////////////////// Cart Routes //////////

app.get('/products/cart',(req,res)=>{


    const user=req.session.username;

    cartModel.find({username:user})
        .then((result)=>{
            console.log("Printing Cart Items"+result)
            res.render('cart',{username:req.session.username,cart_items:result})
        })
        .catch((err)=>{
            console.log(err);
        })

    
})