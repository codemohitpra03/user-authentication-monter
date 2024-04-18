const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const generateOtp = () =>{
    return Math.floor(1000 + Math.random()*9000);
}

module.exports = {
    re,
    generateOtp
}