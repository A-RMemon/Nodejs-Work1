const authModel = require("../Models/authModel");
const userValidate = require("../Validator/authValidate");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require("../router/adminRouter");
require('dotenv').config();
const secret = process.env.jwtSecret;



exports.login = async (req, res) => {
    try {
      let { email,password } = req.body;
      let useradmin = await authModel.findOne({email:email})
      if(!useradmin){
        return res.status(400).json({
          message:'user not registered',
        });
      }


         let checkPassword = await bcrypt.compare(password,useradmin.password)     
         if(!checkPassword){
          return res.status(400).json({ message: "Invalid password" });
         }
         let secret = await process.env.Admin_secret
         if(req.body.secret != secret){
         console.log(secret)
          return res.status(400).json({ message: "Invalid secret" });
         }

      // if(process.env.admin-email == email){
      //   return res.status(400).json({
      //     message: 'admin login successfully'
      //   })
      // }      
      // let userCheck = await authModel.findOne({ email: email })
      // if (userCheck) {
      //   return res.status(400).json({
      //     message: "Email already exist",
      //     status: false
      //   })
      // }
      // const hashpassword = await bcrypt.hash(password, 12)
      // req.body.password = hashpassword;
  
      // const otp = Math.floor(Math.random() * 90000);
      // req.body.otpCode = otp
  
  
      // const transporter = nodemailer.createTransport({
      //   host: "smtp.ethereal.email",
      //   service: "gmail",
      //   port: 587,
      //   secure: false, // true for port 465, false for other ports
      //   auth: {
      //     user: process.env.smtpemail,
      //     pass: process.env.smtppasskey,
      //   },
      //   tls: {
      //     rejectUnauthorized: false
      //   }
      // });
  
      // async function main() {
      //   // send mail with defined transport object
      //   const info = await transporter.sendMail({
      //     from: process.env.smtpemail, // sender address
      //     to: req.body.email, // list of receivers
      //     subject: "Verification OTP", // Subject line
      //     //   text: "Hello world?", // plain text body
      //     html: `<b>Your Otp is ${otp}</b>`, // html body
      //   });
      // }
      // main().catch(console.error);
  
      // let user = authModel(req.body)
      // await user.save()
  
      // let token = jwt.sign({ _id: user._id }, secret, { expiresIn: '2h' });
  
  
      // await userValidate.validateAsync(req.body) // this line is also true
      res.status(200).json({
        message: "admin matched",
        useradmin
        // token,
        // otp
      });
    } catch (e) {
      res.status(404).json({
        error: e.message,
      });
    }
  };
  exports.createAdmin = (req,res) => {
    try{

    }catch(e){
      
    }
  }