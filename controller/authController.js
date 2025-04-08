const authModel = require("../Models/authModel");
const userValidate = require("../Validator/authValidate");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.jwtSecret;
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');
const profileModel = require("../Models/profileModel");



exports.signup = async (req, res) => {
  try {
    let emailValidate = await userValidate.validate(req.body)
    if (emailValidate.error) {
      return res.status(400).json({
        message: emailValidate.error.details[0].message,
        status: false
      })
    }
    let { email, password } = req.body;
    let userCheck = await authModel.findOne({ email: email })
    if (userCheck) {
      return res.status(400).json({
        message: "Email already exist",
        status: false
      })
    }
    const hashpassword = await bcrypt.hash(password, 12)
    req.body.password = hashpassword;

    const otp = Math.floor(Math.random() * 90000);
    req.body.otpCode = otp


    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      service: "gmail",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.smtpemail,
        pass: process.env.smtppasskey,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: process.env.smtpemail, // sender address
        to: req.body.email, // list of receivers
        subject: "Verification OTP", // Subject line
        //   text: "Hello world?", // plain text body
        html: `<b>Your Otp is ${otp}</b>`, // html body
      });
    }
    main().catch(console.error);

    let user = authModel(req.body)
    await user.save()

    let token = jwt.sign({ _id: user._id }, secret, { expiresIn: '2h' });


    // await userValidate.validateAsync(req.body) // this line is also true
    res.status(200).json({
      message: "User Stored",
      token
    });
  } catch (e) {
    res.status(404).json({
      error: e.message,
    });
  }
};
exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({
        message: "Enter Otp Code"
      });
    }
    let user = await authModel.findById(req._id)
    if (!user) {
      return res.status(400).json({
        message: "User Not Found"
      });
    }
    if (user.otpCode != otp) {
      return res.status(400).json({
        message: "invalid otp"
      });
    }
    let userUpdate = await authModel.findByIdAndUpdate(req._id, {
      verify: true
    })
    return res.status(200).json({
      message: "User Verified successfully",
      data: userUpdate
    });

  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }

}

exports.completeProfile = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).json({
        message: "Please upload profile picture",
        status: false
      });
    }
    const folderName = 'AuthPictures';
    const qualityLevel = 'auto:low';

    let stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: folderName,
        quality: qualityLevel,
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            error: "Failed to upload image to Cloudinary",
            details: error,
          });
        }

        let body = {
          age: req.body.age,
          gender: req.body.gender,
          image: result.secure_url,
          authId: req._id
        }
        let profileData = await profileModel(body)
        profileData.save()

        await authModel.findOneAndUpdate(
          {
            _id: req._id
          },
          {
            profileId:profileData._id
          }
        )
        return res.status(200).json({
          message: "stored & data stored",
          data: profileData

        })
      })
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
}
exports.login = async(req,res)=> {
  try {
    let {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        message:'invalid Data',
      });
    }
    let userCheck = await authModel.findOne({email:email}).populate('profileId')
    if(!userCheck){
      return res.status(400).json({
        message:'user not registered',
      });
    }
    else{      
      let checkPassword = await bcrypt.compare(password,userCheck.password)      
      if(!checkPassword){
        return res.status(400).json({
          message:'invalid password',
        });
      }
      let token = jwt.sign({ _id: userCheck._id }, secret, { expiresIn: '2h' });
      if(userCheck.verify == false){
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          service: "gmail",
          port: 587,
          secure: false, // true for port 465, false for other ports
          auth: {
            user: process.env.smtpemail,
            pass: process.env.smtppasskey,
          },
          tls: {
            rejectUnauthorized: false
          }
        });
    
        async function main() {
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: process.env.smtpemail, // sender address
            to: email, // list of receivers
            subject: "Verification OTP", // Subject line
            //   text: "Hello world?", // plain text body
            html: `<b>Your Otp is ${ userCheck.otpCode}</b>`, // html body
          });
        }
        main().catch(console.error);
    
        return res.status(400).json({
          message: 'please first verify',
          token,
          otp: userCheck.otpCode

        });
      }
      return res.status(200).json({
        message: 'Login success',
        data : userCheck,
        token
      });
    }
  } catch (error) {
    return res.status(400).json({
      message:'invalid password',
    });
  }
}