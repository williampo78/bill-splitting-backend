import { Document, Schema, model, Types } from 'mongoose';

export interface User extends Document {
    // _id: Types.ObjectId;
    name: string;
    groupId: Types.ObjectId;
}

// Create the User schema
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    groupId: { type: Types.ObjectId, ref: 'group', required: true }
});


export default model<User>('user', UserSchema);