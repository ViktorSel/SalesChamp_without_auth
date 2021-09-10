import { date, number, object, string, StringSchema } from 'yup';

const payload = {
  body: object({
    country: string()
        .required('Country is required')
        .trim('Don\'t use spaces')
        .uppercase('Щnly capital letters')
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
        .matches(/^\d{5}$/, 'PostalCode can only contain digits.')
        .min(5, 'PostalCode is too short - should be 5 digits minimum.')
        .max(5, 'PostalCode is too long - should be 5 digits maximum.'),
    number: number()
        .required('Number is required')
        .min(1, 'Number should be 0 minimum.'),
    ​numberAddition: string(),
    createdAt: date(),
    updatedAt: date(),
    status: string(),
    name: string(),
    email: string()
        .email('Must be a valid email')
        .max(255)
  }),
};

const params = {
  params: object({
    addressId: string().required('addressId is required'),
  }),
};

export const createAddressSchema = object({
  ...payload,
});

export const updateAddressSchema = object({
  ...params,
  ...payload,
});

export const deleteAddressSchema = object({
  ...params,
});