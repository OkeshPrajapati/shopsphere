const { default: mongoose } = require("mongoose")

const connectDb = async()=>{
    try {
        let res = await  mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connnected")
    } catch (error) {
           console.log(" error while  connnecting mongodb",error)
        
    }
}
module.exports =connectDb
