const config={
    production :{
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE: `${process.env.MONGO_URI}/user-monter`
    },
    default : {
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE: `${process.env.MONGO_URI}/user-monter`
    }
}


exports.get = function get(env){
    return config[env] || config.default
}