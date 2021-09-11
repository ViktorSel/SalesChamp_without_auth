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
  
  export function findAndUpdate(
    query: FilterQuery<AddressDocument>,
    update: UpdateQuery<AddressDocument>,
    options: QueryOptions
  ) {
    return Address.findOneAndUpdate(query, update, options);
  }
  
  export function deleteAddress(query: FilterQuery<AddressDocument>) {
    return Address.deleteOne(query);
  }