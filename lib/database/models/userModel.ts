import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    email: {type:String, unique:true, required:true},
    clerkId: {type:String, unique:true, required:true},
    userName: {type:String, unique:true, required:true},
    photo: {type:String,  required:true},
    firstName: {type:String},
    lastName: {type:String},
    planId:{type:Number, default:1},
    creditBalance:{type:Number, default:10}
})

const User = models?.User || model('User', userSchema)

export default User;