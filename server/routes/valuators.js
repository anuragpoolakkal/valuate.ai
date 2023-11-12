import express from "express";
import joi from "joi";
import Valuator from "../models/Valuator.js";
import OpenAI from "openai";
import aiPrompt from "../utils/utils.js";
import Valuation from "../models/Valuation.js";

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

        const respData = JSON.parse(resp.split("```json")[1].split("```")[0]);

        const newValuation = new Valuation({
            valuatorId: data.valuatorId,
            data: respData,
            answerSheet: data.answerSheet,
        });

        await newValuation.save();

        return res.send(respData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

router.post("/valuations", async (req, res) => {
    const schema = joi.object({
        valuatorId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const valuations = await Valuation.find({ valuatorId: data.valuatorId }).lean();

        for (const valuation of valuations) {
            valuation.questionPaper = (await Valuator.findById(valuation.valuatorId)).questionPaper;
            valuation.answerKey = (await Valuator.findById(valuation.valuatorId)).answerKey;
        }

        return res.send(valuations.reverse());
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/marksheet", async (req, res) => {
    const schema = joi.object({
        valuatorId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const valuations = await Valuation.find({ valuatorId: data.valuatorId }).lean();

        var marksheet = [];

        for (const valuation of valuations) {
            const answers = valuation.data.answers;
            var totalScore = 0;

            for (const answer of answers) {
                totalScore += answer.score[0];
            }

            marksheet.push({
                name: valuation.data.student_name,
                rollNo: valuation.data.roll_no,
                marks: totalScore,
                isChecked: true
            });
        }

        //sort by marks
        marksheet.sort((a, b) => b.marks - a.marks);

        return res.send(marksheet);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/revaluate", async (req, res) => {
    const schema = joi.object({
        valuationId: joi.string().required(),
        remarks: joi.string().required().allow(""),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const valuation = await Valuation.findById(data.valuationId);

        const valuator = await Valuator.findById(valuation.valuatorId);

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: aiPrompt + "\n\nEXTRA REMARKS (VERY IMPORTANT!!): " + data.remarks + (data.remarks ? "\nGive remarks as 'Revaluated' for all questions extra remarks applied to." : ""),
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
                                "url": valuation.answerSheet,
                            },
                        },
                    ]
                }
            ],
            "max_tokens": 1000,
        });

        const resp = completion.choices[0].message.content;

        const respData = JSON.parse(resp.split("```json")[1].split("```")[0]);

        await Valuation.findByIdAndUpdate(data.valuationId, {
            data: respData,
        });

        return res.send(respData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

export default router;