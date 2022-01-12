import mongoose from 'mongoose'
const Schema=mongoose.Schema;

const todoSema=new Schema({
    baslik:{
        type:String,
        required:true
    },
    aciklama:String,
    tarih:Date
},{timestamps:true})


const Todo=mongoose.model('todo',todoSema);

export default Todo;