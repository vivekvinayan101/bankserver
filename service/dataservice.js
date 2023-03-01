const jwt = require("jsonwebtoken")

userDetails = {
  1000: { acno: 1000, username: "Anu", password: "abc123", balance: 0, transaction: [] },
  1001: { acno: 1000, username: "Amal", password: "abc123", balance: 0, transaction: [] },
  1002: { acno: 1000, username: "Arun", password: "abc123", balance: 0, transaction: [] },
  1003: { acno: 1000, username: "Akhil", password: "abc123", balance: 0, transaction: [] }
}


register = (user, pass, acno) => {

  if (acno in userDetails) {

    return {
      status: false,
      message: 'user already exist',
      statuscode: 401
    }
  }
  else {

    userDetails[acno] = { acno: acno, username: user, password: pass, balance: 0, transaction: [] }
    //   console.log(this.userDetails);

    return {
      status: true,
      message: 'Registered successfully',
      statuscode: 200
    }

  }

}

login = (acno, pass) => {


  if (acno in userDetails) {

    if (pass == userDetails[acno]["password"]) {
      currentName = userDetails[acno]["username"]
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
        message: 'incorrect password',
        statuscode: 401
      }
    }

  } else {
    return {
      status: false,
      message: 'not registered',
      statuscode: 401
    }
  }

}


deposit = (acnum, password, amount) => {


  var amnt = parseInt(amount) //to convert string value into integer value

  console.log(amnt);

  if (acnum in userDetails) {
    if (password == userDetails[acnum]["password"]) {

      userDetails[acnum]["balance"] += amnt // update balance

      //store transaction data
      userDetails[acnum]["transaction"].push({ Type: "CREDIT", amount: amnt })




      // return userDetails[acnum]["balance"] //return current balance

      return {
        status: true,
        message: `${amount} is credited to your account and the current balance is ${userDetails[acnum]["balance"]}`,
        statuscode: 200
      }

    }
    else {
      return {
        status: false,
        message: "incorrect passsword",
        statuscode: 401
      }
    }
  }
  else {
    return {
      status: false,
      message: "Account doesn't exist",
      statuscode: 401
    }
  }

}

//withdraw

withdraw = (acnum, password, amount) => {


  var amnt = parseInt(amount) //to convert string value into integer value

  if (acnum in userDetails) {
    if (password == userDetails[acnum]["password"]) {

      if (amnt <= userDetails[acnum]["balance"]) {
        userDetails[acnum]["balance"] -= amnt // update balance

        //store transaction data
        userDetails[acnum]["transaction"].push({ Type: "DEBIT", amount: amnt })



        return {
          status: true,
          message: `${amount} has been debited from your account and your current balance is${userDetails[acnum]["balance"]}`,
          statuscode: 200
        }


      } else {
        return {
          status: false,
          message: "Insufficient balance",
          statuscode: 401
        }

      }

    }
    else {
      return {
        status: false,
        message: "incorrect passsword",
        statuscode: 401
      }
    }
  }
  else {

    return {
      status: false,
      message: "Account doesnt exist",
      statuscode: 401
    }
  }

}

//get transaction

getTransaction = (acno) => {


  return {
    status: true,
    statuscode: 200,
    transaction: userDetails[acno]["transaction"]
  }
}




module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}

