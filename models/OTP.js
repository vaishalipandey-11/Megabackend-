const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const OTPSchema = new mongoose.Schema({
 
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});


    // afunction to send mail
    // mailer code pre post middle wale so schema se phle or model k baad 
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Email from StudyBuddy ", otp);
        console.log("Email sent Successfully:" , mailResponse);
    }
    catch(error){
        console.log("error occured while sending mails :", error);
        throw error ;

    }
}
//pre middlewware 
OTPSchema.pre("save ", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next(); 
})

module.exports = mongoose.Schema("OTP",OTPSchema);