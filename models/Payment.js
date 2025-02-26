import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userecommerse",
    },
    paymentID: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Success",
        "Failed",
        "delivered",
        "cancelled",
        "refund",
      ],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Payment", PaymentSchema);
