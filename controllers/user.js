const UserDetailsModel = require('../models/user_details')

const {re} = require('../utils/constants');

const handleAddDetails = async(req,res) =>{
    try {
        const {email,location,age,workDetails} = req.body;
        console.log(email);
        if(!re.test(email)){
            return res.status(400).json({
                status:400,
                message:"Enter valid email address"
            });
        }

        await UserDetailsModel.findOneAndUpdate({email},{
            email,age : age ? age : "",location : location ? location : "", workDetails : workDetails ? workDetails : "",
        },{
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
        
        return res.status(200).json({
            status:200,
            message:"Details added successfully"
        })


    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"Error while adding details"
        })
    }
}

const handleGetDetails = async(req,res) =>{
    try {
        const {email} = req.query;

        const details = await UserDetailsModel.findOne({email})

        if(!details) {
            return res.status(404).json({
                status:400,
                message:"No details found"
            })
        }

        return res.status(200).json({
            status:200,
            message:"Details fetched successfully",
            details : {email : details.email, age : details.age,location : details.location,workDetails : details.workDetails}
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"Error while fetching details"
        })
    }
}

module.exports = {
    handleAddDetails,
    handleGetDetails
}