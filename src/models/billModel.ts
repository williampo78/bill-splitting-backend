import { Document, Schema, model, Types } from 'mongoose';
import { UserSchema } from './UserModel';

export interface Bill extends Document {
    _id?: Types.ObjectId;
    item: string;
    groupId: Types.ObjectId
    price: number
    paidBy: Types.ObjectId
    sharedBy: { userId: Types.ObjectId, ammout: number }[]
    payingTime: Date | string
}


// Create the User schema
const SharingSchema: Schema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: 'user' },
    ammount: { type: Number, required: true }
});

const BillSchema: Schema = new Schema({
    // _id: Types.ObjectId,
    item: { type: String, required: true },
    groupId: { type: Types.ObjectId, ref: 'group' },
    price: { type: Number, required: true },
    paidBy: { type: Types.ObjectId, required: true, ref: 'user' },
    sharedBy: [SharingSchema],
    payingTime: { type: Date, required: true }
}, { timestamps: true })

export default model('bill', BillSchema);
