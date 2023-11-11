import express from "express";
import joi from "joi";
import Valuator from "../models/Valuator.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await Valuator.find());
});

router.post("/", async (req, res) => {
    const schema = joi.object({
        title: joi.string().required(),
        questionPaper: joi.string().required(),
        answerKey: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const newValuator = new Valuator({
            title: data.title,
            questionPaper: data.questionPaper,
            answerKey: data.answerKey,
        });

        return res.send(await newValuator.save());
    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
});

export default router;