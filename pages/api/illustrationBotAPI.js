import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const gptResponse = await openai.createImage({
      prompt: req.body.text,
      n: parseInt(req.body.n),
      size: req.body.size,
      response_format : 'b64_json'
    });

    console.log('API response:', gptResponse.data); // Log the response data

    res.status(200).json(gptResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred with the OpenAI API.' });
  }
}
