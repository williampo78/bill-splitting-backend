import { Document, Schema, model, Types } from 'mongoose';

interface Group extends Document {
    // _id: Types.ObjectId;
    code: string;
    name: string;
    users: Types.ObjectId[];
}


// Create the Group schema
const GroupSchema: Schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    users: [{ type: Types.ObjectId, ref: 'user' }]
}, { timestamps: true });

export default model<Group>('group', GroupSchema);
