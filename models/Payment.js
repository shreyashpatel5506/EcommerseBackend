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
      type: Boolean,
      default: false,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", PaymentSchema);
