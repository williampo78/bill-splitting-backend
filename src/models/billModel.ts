import { Document, Schema, model, Types } from 'mongoose';


// Create the User schema
const ExpenseSchema: Schema = new Schema({
    _id: Types.ObjectId,
    userName: { type: String, required: true },
    ammount: { type: Number, required: true }
});

const BillSchema: Schema = new Schema({
    item: { type: String, required: true },
    expense: [ExpenseSchema],
    groupId: { type: Types.ObjectId, ref: 'group' },
}, { timestamps: true })

export default model('bill', BillSchema);
