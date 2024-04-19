const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PASSWORD
    }
});

var mailOptions = {
    from: process.env.MY_EMAIL,
    to: 'myfriend@yahoo.com',
    subject: 'Verify your Identity',
    text: 'That was easy!'
};

const sendOtp = async(mailOptions) =>{

    return new Promise((resolve, reject) =>{
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                resolve(false);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        })
    })
    
}

module.exports = {
    sendOtp
}