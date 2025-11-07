import mongoose, {Schema} from "mongoose"
const cartSchema=new Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
});

export const Cart=mongoose.models.Cart || mongoose.model("Cart",cartSchema);