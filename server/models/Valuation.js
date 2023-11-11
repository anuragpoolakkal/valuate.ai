import mongoose from "mongoose";

const ValuationSchema = new mongoose.Schema(
    {
        valuatorId: {
            type: String,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Valuation = mongoose.model("Valuation", ValuationSchema);

export default Valuation;