'use server'

import { revalidatePath } from "next/cache";
import User from "../database/models/userModel";
import { connectDB } from "../database/mongoose"
import { handleError } from "../utils"
import { json } from "stream/consumers";

export async function createUser(user:CreateUserParams) {
    try {
        await connectDB();
        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser))

    } catch (error) {
        handleError(error)
    }
}

export async function getUserById(userId: string){
    try {
        await connectDB()
        const user = await User.findOne({clerkId: userId})

        if(!user) throw new Error('user not found')
        return JSON.parse(JSON.stringify(user))

    } catch (error) {
        handleError(error)
    }
}

export async function updateUser(clerkId:string, user: UpdateUserParams){
    try {
        await connectDB()
        const updatedUser = await User.findByIdAndUpdate({clerkId}, user, {new:true})

        if(!updateUser) throw new Error('user upate failed')

        return JSON.parse(JSON.stringify(updateUser))
        
    } catch (error) {
        handleError(error)
    }

}

export async function deleteUser(clerkId:string){
    try {
        await connectDB()
        const userToDelete = await User.findOne({clerkId})

        if(!userToDelete) throw new Error('no user found')

        const deleteUser = await User.findByIdAndDelete(userToDelete._id)
        revalidatePath('/')

        return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : null;

    }
    
     catch (error) {
        handleError(error)
    }
}

export async function updateCredits(userId:string, creditFee:number) {
    try {
        await connectDB()

        const updatedUserCredits = await User.findOneAndUpdate(
            { _id: userId },
            { $inc: { creditBalance: creditFee }},
            { new: true }
        )
        if(!updatedUserCredits) throw new Error("User credits update failed");

        return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
        handleError(error)
    }
}

