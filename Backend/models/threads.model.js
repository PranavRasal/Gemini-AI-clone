import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    role :{
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{timestamps: true})


const threadSchema = new mongoose.Schema({
    title :{
        type: String,
        default: "New chat"
    },
    messages: [messageSchema]
},{timestamps: true})


export const Thread =  mongoose.model('Thread', threadSchema) ;
export const Message = mongoose.model('Message', messageSchema) ;