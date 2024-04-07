import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: ""
});


const askControllers = {
    send: async (req, res) => {
        const { prompt } = req.body;

        if (!prompt) return res.status(400).json("prompt cannot be empty");

        let ans = "";
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
            stream: true
        })
        for await (const chunk of response) {
            ans += chunk.choices[0]?.delta?.content || "";
        }
        console.log(ans);

        return res.status(200).json({ ans });
    }
}

export default askControllers;