
export default class ProductDto {
    public id: string;
    public name: string;
    public description?: string;
    public price: number;
    public imageName: string;
    public amount: number;

    constructor({ _id, name, description, price, imageName, amount }) {
        this.id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageName = imageName;
        this.amount = amount;
    }
}
