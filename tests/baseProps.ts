// import {  } from "./.test"

import { Product } from "shopify-buy"

export const BaseProps: any /*SomeType*/ = {
  // setSelectedProperty: () => {},
  // selectedProperty: {
  //   _id: 0,
  //   propertyownername: 'Ruth King',
  //   price: '$12910.00',
  //   streetaddress: '4470 Stefanie Flat Apt. 014',
  //   zipcode: '70269',
  //   latitude: 39.92248275098166,
  //   longitude: -75.21264357559222,
  //   bedrooms: 1,
  //   bathrooms: 3,
  //   sqft: 919,
  //   carSpaces: 2,
  //   type: 'Apartment',
  //   daysspotted: 56,
  //   yearbuilt: 1993,
  //   petFriendly: 'cats only',
  // },
  // properties: [
  //   {
  //     _id: 0,
  //     propertyownername: 'Ruth King',
  //     price: '$12910.00',
  //     streetaddress: '4470 Stefanie Flat Apt. 014',
  //     zipcode: '70269',
  //     latitude: 39.92248275098166,
  //     longitude: -75.21264357559222,
  //     bedrooms: 1,
  //     bathrooms: 3,
  //     sqft: 919,
  //     carSpaces: 2,
  //     type: 'Apartment',
  //     daysspotted: 56,
  //     yearbuilt: 1993,
  //     petFriendly: 'cats only',
  //   },
  //   {
  //     _id: 1,
  //     propertyownername: 'Rachel James',
  //     price: '$1189830.00',
  //     streetaddress: '66667 Dan Springs Suite 983',
  //     zipcode: '70269',
  //     latitude: 40.01262749366766,
  //     longitude: -75.2253948861866,
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     sqft: 339,
  //     carSpaces: 2,
  //     type: 'House',
  //     daysspotted: 6,
  //     yearbuilt: 1993,
  //     petFriendly: 'yes',
  //   },
  // ],
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export const catalogBaseProps: {products: Partial<Product[]>} = {
  products: [
    // {
    //   title: 'some title 1',
    //   images: [{
    //     id: '0001-someid',
    //     created_at: '00:00:00',
    //     position: 99,
    //     updated_at: '00:00:00',
    //     product_id: 'someProductID',
    //     variant_ids: ['someid']
    //   }],
    //   variants: [{price: '9.99'}],
    // },
    // {
    //   title: 'some title 2',
    //   images: [{
    //     id: '0002-someid',
    //     created_at: '00:00:00',
    //     position: 99,
    //     updated_at: '00:00:00',
    //     product_id: 'someProductID',
    //     src: './somepath',
    //     variant_ids: ['someid']
    //   }],
    //   variants: [{price: '11.99'}],
    // },
    // {
    //   title: 'some title 3',
    //   images: [{
    //     id: '0003-someid',
    //     created_at: '00:00:00',
    //     position: 99,
    //     updated_at: '00:00:00',
    //     product_id: 'someProductID',
    //     src: './somepath',
    //     variant_ids: ['someid']
    //   }],
    //   variants: [{price: '19.99'}],
    // },
  ],
}
