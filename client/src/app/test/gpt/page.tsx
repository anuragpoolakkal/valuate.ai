"use client";
import { aiPrompt } from "@/utils/utils";
import OpenAI from "openai";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const valuate = async () => {
    setLoading(true);
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
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
                "url": "https://raw.githubusercontent.com/aqeelshamz/src/main/questionpaper.png",
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
                "url": "https://raw.githubusercontent.com/aqeelshamz/src/main/answerkey.png",
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
                "url": "https://raw.githubusercontent.com/aqeelshamz/src/main/ans2.png",
              },
            },
          ]
        }
      ],
      "max_tokens": 1000,
    });

    setLoading(false);

    console.log(completion);

    console.log(completion.choices[0].message.content);
  };

  return (
    <main className="p-5">
      <button className="btn btn-primary" onClick={valuate}>Valuate</button>
    </main>
  )
}