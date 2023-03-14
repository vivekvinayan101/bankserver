//import dataservice file

const dataservice = require('./service/dataservice')

//import cors

const cors = require("cors")

//import json web token

const jwt = require("jsonwebtoken")

//import express

const express = require("express")

//create app using express

const app = express()

//connection string to frontend integration

app.use(cors({origin:'http://localhost:4200'}))

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
         statuscode: 422,
         status: false,
         message: "Please LogIn First"
      })
   }

}

//register - post

app.post('/register', (req, res) => {

   dataservice.register(req.body.user, req.body.pass, req.body.acno).then(result => {

      res.status(result.statuscode).json(result)
   })



})




//login

app.post('/login', (req, res) => {

   dataservice.login(req.body.acno, req.body.pass).then(result => {
      res.status(result.statuscode).json(result)
   })





})

//deposit

app.post('/deposit', jwtmiddleware, (req, res) => {

   console.log(req.body.acnum);

   dataservice.deposit(req.body.acnum, req.body.password, req.body.amount).then(result => {
      res.status(result.statuscode).json(result)
   })


})

//withdraw

app.post('/withdraw', jwtmiddleware, (req, res) => {


   dataservice.withdraw(req.body.acnum, req.body.password, req.body.amount).then(result => {
      res.status(result.statuscode).json(result)
   })




})

//get transaction

app.post('/transaction',jwtmiddleware, (req, res) => {


   dataservice.transaction(req.body.acnum).then(result => {
      res.status(result.statuscode).json(result)
   })
   // dataservice.getTransaction(req.body.acno).then(result => {
   //    res.status(result.statuscode).json(result)
   // })


})

//delete

app.delete('/delete/:acno',jwtmiddleware,(req,res) => {
   dataservice.deleteAc(req.params.acno).then(result => {
      res.status(result.statuscode).json(result)
   })
})


// create port

app.listen(3000, () => { console.log("Server started at port number 3000"); })