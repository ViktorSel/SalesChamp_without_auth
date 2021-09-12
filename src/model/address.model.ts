import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { UserDocument } from './user.model';

export interface AddressDocument extends mongoose.Document {
  country: string;
  city: string;
  postalcode: string;
  number: number;
  numberAddition: string;
  status: null | string;
  name: null | string;
  email: null | string;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new mongoose.Schema(
  {
    country: { type: String, minlength:2, maxlength:2, uppercase: true, trim: true },
    city: { type: String,  minlength:1, trim: true },
    street: { type: String,  minlength:1, trim: true },
    postalcode:  { type: String,  minlength:5, maxlength:5, trim: true },
    number: { type: Number, min:1,
      validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    },
    numberAddition: { type: String, default: '', trim: true},
    status: { type: String, default: null, enum: [null, 'not at home', 'not interested', 'interested']},
    name: { type: String, default: null},
    email: { type: String, default: null},
  },
  { timestamps: true }
  //default: Date.now
);

const Address = mongoose.model<AddressDocument>('Address', AddressSchema);

export default Address;