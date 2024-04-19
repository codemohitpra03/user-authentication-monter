const UserModel = require('../models/user_cred')
const OtpModel = require('../models/otp')
const {re,generateOtp,oneMinCheck,expiryCheck} = require('../utils/constants');
const {sendOtp} = require('../utils/send_email')
const handleSendOtp = async (req,res) => {
    try {
        const { email } = req.body;
        

        if(!re.test(email)){
            return res.json({
                status:400,
                message:"Enter valid email address"
            });
        }
        // Check if username already exists
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                status:400,
                message:"Email does not exists"
            });
        }
        

        if(existingUser.is_verified === 1){
            return res.status(400).json({
                status:400,
                message:"User already verified"
            });
        }

        const otp = generateOtp();

        const existingOtp = await OtpModel.findOne(existingUser._id);
        console.log(existingOtp);
        if(existingOtp){
            const sendNext = await oneMinCheck(existingOtp.timestamp)

            if(!sendNext){
                return res.status(400).json({
                    status:400,
                    message:"Cannot send Otp ... to early , try after some time"
                });
            }
        }

        await OtpModel.findByIdAndUpdate(existingUser._id,{
            user_id:existingUser._id,
            user_email:existingUser.email,
            otp,
            timestamp: new Date(),  
        },{
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })

        

        const msg = `Hello ${existingUser.email}. otp is  ${otp}`

        // console.log(msg);

        const mailOptions = {
            
            to: existingUser.email,
            subject: 'Verify your Identity',
            text: msg
        };

        await sendOtp(mailOptions)
       



        return res.status(200).json({
            status:200,
            message:"Otp sent successful",
        });

    }catch (error) {
        // Handle any errors
        console.error('Error sending otp:', error);
        return res.status(500).json({
            status:500,
            message:"Error while sending otp"
        });
    }
}

const handleVerifyOtp = async (req,res) =>{
    try {
        //verify
        const { otp,user_email } = req.body;
        

        if(!otp || !user_email || otp.length != 4 || !re.test(user_email)){
            return res.status(400).json({
                status:400,
                message:"Please enter valid otp and user id"
            });
        }

        const otpdata = await OtpModel.findOne({user_email,otp})
        
        if(!otpdata) {
            return res.status(400).json({
                status:400,
                message:"You entered wrong otp"
            });
        }

        const is_expired = await expiryCheck(otpdata.timestamp);

        if(is_expired) {
            return res.status(400).json({
                status:400,
                message:"OTP expired"
            });
        }
        
        await UserModel.findOneAndUpdate({email:user_email},{
            $set:{
                is_verified:1
            }
        })
        
        return res.status(200).json({
            status:200,
            message:"Verification done successful",
        });
    }catch (error) {
        // Handle any errors
        console.error('Error verifying otp:', error);
        return res.status(500).json({
            status:500,
            message:"Error while verifying otp"
        });
    }
}


const handleSendOtpWhileRegistration = async(email) =>{
    try {
        
        

        if(!re.test(email)){
            return {
                status:400,
                message:"Enter valid email address"
            };
        }
        // Check if username already exists
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return {
                status:400,
                message:"Email does not exists"
            };
        }
        

        if(existingUser.is_verified === 1){
            return {
                status:400,
                message:"User already verified"
            };
        }

        const otp = generateOtp();

        const existingOtp = await OtpModel.findOne(existingUser._id);
        console.log(existingOtp);
        if(existingOtp){
            const sendNext = await oneMinCheck(existingOtp.timestamp)

            if(!sendNext){
                return {
                    status:400,
                    message:"Cannot send Otp ... to early , try after some time"
                };
            }
        }

        await OtpModel.findByIdAndUpdate(existingUser._id,{
            user_id:existingUser._id,
            user_email:existingUser.email,
            otp,
            timestamp: new Date(),  
        },{
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })

        

        const msg = `Hello ${existingUser.email}. otp is  ${otp}`

        // console.log(msg);

        const mailOptions = {
            
            to: existingUser.email,
            subject: 'Verify your Identity',
            text: msg
        };

        await sendOtp(mailOptions)
        return {
            status:200,
            message:"Otp sent successful",
        }
        
    } catch (error) {
        console.error('Error sending otp:', error);
        return {
            status:500,
            message:"Error while sending otp"
        };
    }
}

module.exports = {
    handleSendOtp,
    handleVerifyOtp,
    handleSendOtpWhileRegistration
}