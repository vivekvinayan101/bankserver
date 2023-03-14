const jwt = require("jsonwebtoken")
const db = require('./db')

// userDetails = {
//   1000: { acno: 1000, username: "Anu", password: "abc123", balance: 0, transaction: [] },
//   1001: { acno: 1000, username: "Amal", password: "abc123", balance: 0, transaction: [] },
//   1002: { acno: 1000, username: "Arun", password: "abc123", balance: 0, transaction: [] },
//   1003: { acno: 1000, username: "Akhil", password: "abc123", balance: 0, transaction: [] }
// }


register = (user, pass, acno) => {

  // if (acno in userDetails) {

  return db.User.findOne({ acno }).then(Person => {
    if (Person) {
      return {
        status: false,
        message: 'user already exist',
        statuscode: 401
      }
    } else {
      //create new user object in database
      const newuser = new db.User({
        acno: acno,
        username: user,
        password: pass,
        balance: 0,
        transaction: []
      })
      // save object in db
      newuser.save()

      return {
        status: true,
        message: 'Registered successfully',
        statuscode: 200
      }
    }
  })


}


login = (acno, pass) => {


  return db.User.findOne({ acno, password: pass }).then(Person => {
    if (Person) {
      currentName = Person.username
      currentAcno = acno

      const token = jwt.sign({ currentAcno }, "secretkey1")


      return {
        status: true,
        message: 'Login Success',
        statuscode: 200,
        currentName,
        currentAcno,
        token


      }
    } else {
      return {
        status: false,
        message: 'incorrect account number or password',
        statuscode: 401
      }
    }
  })



}


deposit = (acnum, password, amount) => {


  var amnt = parseInt(amount) //to convert string value into integer value

  console.log(amnt);

  // if (acnum in userDetails) {

  return db.User.findOne({ acno: acnum, password }).then(Person => {
    if (Person) {

      Person.balance += amnt

      //store transaction data
      Person.transaction.push({ Type: "CREDIT", amount: amnt })

      Person.save()

      return {
        status: true,
        message: `${amount} is credited to your account and the current balance is ${Person.balance}`,
        statuscode: 200
      }
    } else {
      return {
        status: false,
        message: "incorrect account number or passsword",
        statuscode: 401
      }
    }
  })
}





//withdraw

withdraw = (acnum, password, amount) => {


  var amnt = parseInt(amount) //to convert string value into integer value

  return db.User.findOne({ acno: acnum, password }).then(Person => {

    if (Person) {

      if (amnt <= Person.balance) {
        Person.balance -= amnt // update balance

        //store transaction data
        Person.transaction.push({ Type: "DEBIT", amount: amnt })

        Person.save()

        return {
          status: true,
          message: `${amount} has been debited from your account and your current balance is ${Person.balance}`,
          statuscode: 200
        }
      } else {
        return {
          status: false,
          message: "Insufficient balance",
          statuscode: 401
        }

      }
    } else {
      return {
        status: false,
        message: "Incorrect account number or Password",
        statuscode: 401
      }

    }

  }
  )
}





//get transaction

transaction = (acnum) => {

  return db.User.findOne({ acnum }).then(Person => {
    if (Person) {

      return {
        status: true,
        statuscode: 200,
        transaction: Person.transaction
      }
    }
  })


}

//Delete Account

deleteAc=(acno)=>{

  return db.User.deleteOne({acno}).then(Person => {
    if(Person){
      return {
        status: true,
        message: "Account Deleted",
        statuscode: 200
      }
    }
    else{
      return{
        status: false,
        message: "User does not exist",
        statuscode: 401
      }
    }
  })
}



module.exports = {
  register,
  login,
  deposit,
  withdraw,
  transaction,
  deleteAc
}

