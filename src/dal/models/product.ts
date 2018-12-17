import { Document, model, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
    createdAt?: Date;
    name: string;
    description?: string;
    price: number;
    imageName: string;
    amount: number;
}

export const ProductSchema: Schema = new Schema({
    createdAt: Date,
    name: String,
    description: { type: String, required: false },
    price: Number,
    imageName: String,
    amount: Number,
});

ProductSchema.pre('save', function(this: IProduct, next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export const Product: Model<IProduct> = model<IProduct>('Product', ProductSchema);
