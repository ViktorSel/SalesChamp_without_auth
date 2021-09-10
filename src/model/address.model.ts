import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { UserDocument } from './user.model';

export interface AddressDocument extends mongoose.Document {
  user: UserDocument['_id'];
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new mongoose.Schema(
  {
    addressId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    country: { type: String },
    city: { type: String },
    street: { type: String },
    postalcode:  { type: String },
    number: { type: Number },
    numberAddition: { type: String, default: ''},
    status: { type: String, default: null},
    name: { type: String, default: null},
    email: { type: String, default: null},
  },
  { timestamps: true }
  //default: Date.now
);

const Address = mongoose.model<AddressDocument>('Address', AddressSchema);

export default Address;