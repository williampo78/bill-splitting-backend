import { Document, Schema, model, Types } from 'mongoose';


// Create the User schema
export const UserSchema: Schema = new Schema({
    name: { type: String, required: true }
});


export default model('user', UserSchema);
