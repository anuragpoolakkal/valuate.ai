import express from "express";
import joi from "joi";
import Valuator from "../models/Valuator.js";
import OpenAI from "openai";
import aiPrompt from "../utils/utils.js";

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

router.post("/byId", async (req, res) => {
    const schema = joi.object({
        id: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const valuator = await Valuator.findById(data.id);
        return res.send(valuator);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});


router.post("/valuate", async (req, res) => {
    const schema = joi.object({
        valuatorId: joi.string().required(),
        answerSheet: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const valuator = await Valuator.findById(data.valuatorId);

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });


        const completion = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: aiPrompt,
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Question Paper:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": valuator.questionPaper,
                            },
                        },
                    ],
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Answer Keys:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": valuator.answerKey,
                            },
                        },
                    ]
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Answer Sheet:" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": data.answerSheet,
                            },
                        },
                    ]
                }
            ],
            "max_tokens": 1000,
        });

        const resp = completion.choices[0].message.content;

        return res.send(JSON.parse(resp.split("```json")[1].split("```")[0]));
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

export default router;