//import dataservice file
const dataservice = require('./service/dataservice')

//import json web token
const jwt = require("jsonwebtoken")

//import express

const express = require("express")

//create app using express

const app = express()

//to parse JSON data from req body

app.use(express.json())

//middleware
const jwtmiddleware = (req, res, next) => {
   try {
      const token = req.headers['access_token']
      //verify token
      const data = jwt.verify(token, "secretkey1")
      //to continue to the next step
      next()
   }
   catch {
      res.status(422).json({
         statuscode:422,
         status:false,
         message:"Please LogIn First"
      })
   }

}

//register - post

app.post('/register', (req, res) => {

   const result = dataservice.register(req.body.user, req.body.pass, req.body.acno)

   res.status(result.statuscode).json(result)



})




//login
app.get('/login', (req, res) => {

   const result = dataservice.login(req.body.acno, req.body.pass)

   res.status(result.statuscode).json(result)



})

//deposit
app.post('/deposit', jwtmiddleware, (req, res) => {

   console.log(req.body.acnum);

   const result = dataservice.deposit(req.body.acnum, req.body.password, req.body.amount)

   res.status(result.statuscode).json(result)





})

//withdraw

app.post('/withdraw', jwtmiddleware, (req, res) => {


   const result = dataservice.withdraw(req.body.acnum, req.body.password, req.body.amount)

   res.status(result.statuscode).json(result)


})

//get transaction

app.get('/getTransaction', jwtmiddleware, (req, res) => {


   const result = dataservice.getTransaction(req.body.acno)

   res.status(result.statuscode).json(result)


})


// create port

app.listen(3000, () => { console.log("Server started at port number 3000"); })