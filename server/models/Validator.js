import mongoose from "mongoose";

const ValidatorSchema = new mongoose.Schema(
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

const Validator = mongoose.model("Validator", ValidatorSchema);

export default Validator;