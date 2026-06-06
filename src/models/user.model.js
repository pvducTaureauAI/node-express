import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    state:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);