import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var keySchema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    permissions:{
        type:[String],
        required:true,
    },
}, {
    timestamps: true,
});

//Export the model
const KeysModel = mongoose.model('Key', keySchema);
export default KeysModel;