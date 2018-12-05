import { IProduct } from '../models/product';

export default class ProductDto {
    id: string;
    name: string;
    description?: string;
    price: number;
    imageName: string;
    amount: number;

    constructor({_id, name, description, price, imageName, amount}) {
        this.id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageName = imageName;
        this.amount = amount;
    }
}