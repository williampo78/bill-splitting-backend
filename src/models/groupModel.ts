import { Document, Schema, model, Types } from 'mongoose';

interface User extends Document {
    // _id: Types.ObjectId;
    name: string;
}

interface Group extends Document {
    // _id: Types.ObjectId;
    code: string;
    name: string;
    users: User[];
}

// Create the User schema
const UserSchema: Schema = new Schema({
    name: { type: String, required: true }
});

// Create the Group schema
const GroupSchema: Schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    users: [UserSchema]
}, { timestamps: true });

export default model('group', GroupSchema);
