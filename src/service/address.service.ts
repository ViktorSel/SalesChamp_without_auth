import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from 'mongoose';
  import Address, { AddressDocument } from '../model/address.model';
  
  export function createAddress(input: DocumentDefinition<AddressDocument>) {
    return Address.create(input);
  }
  
  export function findAddress(
    query: FilterQuery<AddressDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return Address.findOne(query, {}, options);
  }

  export function findAllAddress(
    query: FilterQuery<AddressDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return Address.find(query, {}, options);
  }
  
  export async function findAndUpdate(
    query: FilterQuery<AddressDocument>,
    update: UpdateQuery<AddressDocument>,
    options: QueryOptions
  ) {
    let address = await Address.findOneAndUpdate(query, update, options);
    delete address?.userId;
    return address;
  }
  
  export function deleteAddress(query: FilterQuery<AddressDocument>) {
    return Address.deleteOne(query);
  }