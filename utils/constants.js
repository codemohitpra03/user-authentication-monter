const mongoose = require('mongoose')
const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const CircularJSON = require('circular-json');

const generateOtp = () =>{
    return Math.floor(1000 + Math.random()*9000);
}

const oneMinCheck = (timestamp) =>{
    try {
        const currentTime = new Date()
        
        let diff = (currentTime.getTime() - timestamp)/1000;
        diff/=60;
        
        return diff > 1;
        
    } catch (error) {
        console.log(error);
    }
}

const expiryCheck = (timestamp) =>{
    try {
        const currentTime = new Date()
        
        let diff = (currentTime.getTime() - timestamp)/1000;
        diff/=60;
        
        return diff > 3
        
    } catch (error) {
        console.log(error);
    }
}

const convertCircularToUsualJSON = (json) =>{
    return JSON.parse(CircularJSON.stringify(json))
}

module.exports = {
    re,
    generateOtp,
    oneMinCheck,
    expiryCheck,
    convertCircularToUsualJSON
}