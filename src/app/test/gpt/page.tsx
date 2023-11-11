"use client";
import OpenAI from "openai";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const valuate = async () => {
    console.log("key", process.env.NEXT_PUBLIC_OPENAI_API_KEY);

    setLoading(true);
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What’s in this image?" },
            {
              type: "image_url",
              image_url: {
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
              },
            },
          ],
        },
      ],
    });

    setLoading(false);

    console.log(completion);

    console.log(completion.choices[0].message.content);
  };

  return (
    <main>
      <button></button>
    </main>
  )
}