export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
  }
  
  export enum ResponseMessage {
    SERVER_ERROR = "Server error!",
    PRODUCT_NOT_FOUND = "Product not found!",
    PRODUCT_DELETED = "Product deleted successfully!",
    GET_ALL_PRODUCT="all product fetched successfully!",
    GET_ONE_PRODUCT="Fetched one product successfully",
    PRODUCT_ADDED="Product added successfully!",
    PRODUCT_EDITED="Product edited successfully!",
  }
  