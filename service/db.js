//import Mongoose
const mongoose=require("mongoose")

//state connection string
mongoose.connect('mongodb://127.0.0.1:27017/bankServer',{useNewUrlParser:true})

//Model(schema) creation (model name must be singular form of collection name & first letter capital)
//schema means fields and values
const User=mongoose.model('User',{
    acno: Number,
    username: String, 
    password: String, 
    balance: Number, 
    transaction: [] 
})

module.exports={
    User
}