import express from "express";
import joi from "joi";
import Validator from "../models/Validator";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await Validator.find());
});

router.post("/", async (req, res) => {
    const schema = joi.object({
        title: joi.string().required(),
        questionPaper: joi.string().required(),
        answerKey: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const newValidator = new Validator({
            title: data.title,
            questionPaper: data.questionPaper,
            answerKey: data.answerKey,
        });

        return res.send(await newValidator.save());
    } catch (err) {
        return res.status(500).send(err);
    }
});

export default router;