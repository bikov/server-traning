import { gql } from 'apollo-server-koa';

export const productSchema = gql`
  type Query {
    product(id: ID!): Product
    products: [Product!]!
  }
  type Mutation {
    createProduct(product: CreateProductInput): Product!
    deleteProduct(id: ID!): ProductDeletedResult
    updateProduct(id: ID!, updateObject: UpdateProductInput!): UpdateResult!
  }
  type Subscription{
    productCreated: ProductCreated!
    productDeleted: ProductDeletedResult!
    productUpdated: ProductUpdated!
  }
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    imageName: String
    amount: Int!
   }
   type UpdateResult {
    found: Int!,
    modified: Int!
   }
   type ProductCreated{
    product: Product!
   }
   type ProductUpdated{
    product: Product!
   }
   type ProductDeleted{
    product: ProductDeletedResult!
   }
   type ProductDeletedResult{
    id: ID!
   }
   input CreateProductInput {
    name: String!
    description: String
    price: Float!
    imageName: String
    amount: Int!
   }
   input UpdateProductInput {
    name: String
    description: String
    price: Float
    imageName: String
    amount: Int
   }
`;