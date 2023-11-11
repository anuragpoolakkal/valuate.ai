import mongoose from "mongoose";

const ValuatorSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        questionPaper: {
            type: String,
            required: true
        },
        answerKey: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Valuator = mongoose.model("Valuator", ValuatorSchema);

export default Valuator;