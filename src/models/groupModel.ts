import { Document, Schema, model, Types } from 'mongoose';

interface User {
    _id: Types.ObjectId;
    name: string;
}

interface Group extends Document {
    _id: Types.ObjectId;
    code: string;
    name: string;
    users: User[]
}

// Create the Group schema
const GroupSchema: Schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    users: [
        {
            name: { type: String, required: true }
        }
    ]
}, { timestamps: true });

export default model<Group>('group', GroupSchema);
