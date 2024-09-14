import mongoose,{ Schema } from "mongoose";

const categorySchema = new Schema({
    name :{
        type:String,
        trim:true,
        unique : true,
        required : true,
        maxLength : 32,   

    }
})

export const Category = mongoose.model("Category", categorySchema);