import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
    url : {type : String, required: true, trim: true},
    name : {type : String, required: true, trim: true},
    count : {type : Number, default : 1}
});

export default mongoose.model('Link', LinkSchema);