import { mixin } from 'lodash';
import { date, number, object, string, mixed, StringSchema } from 'yup';
//import { mixed } from 'yup/lib/locale';

const payload_post = {
  body: object({
    country: string()
        .required('Country is required')
        .trim('Don\'t use spaces')
        .uppercase('Only capital letters')
        .min(2, 'Country is too short - Country should be 2 chars minimum')
        .max(2, 'Country is too long - Country should be 2 chars maximum'),
    city: string()
        .required('City is required')
        .min(1, 'City is too short - should be 3 chars minimum.')
        .max(255,'City is too long - should be 255 chars maximum.' ),
    street: string()
        .required('Street is required')
        .min(1, 'Street is too short - should be 3 chars minimum.')
        .max(255,'Street is too long - should be 255 chars maximum.' ),
    postalcode: string()
        .required('PostalCode is required')
        .min(5, 'PostalCode is too short - should be 5 digits minimum.')
        .max(5, 'PostalCode is too long - should be 5 digits maximum.')
        .matches(/^\d{5}$/, 'PostalCode can only contain digits.'),
    number: number()
        .required('Number is required')
        .integer('Number is not an integer value')
        .positive('Number should be positive.'),
    ​numberAddition: string()
        .nullable(false),
  }),
};

const payload_patch = {
  body: object({
    status: mixed()
        .oneOf(['not at home', 'not interested', 'interested'],'Invalid value of Status')
        .required('Status is required'),
    name: string()
        .nullable(true),
    email: string()
        .email('Must be a valid email')
        .max(255)
        .nullable(true),
  }),
}

const params = {
  params: object({
    addressId: string().required('addressId is required'),
  }),
};

export const createAddressSchema = object({
  ...payload_post,
});

export const updateAddressSchema = object({
  ...params,
  ...payload_patch,
});

export const deleteAddressSchema = object({
  ...params,
});