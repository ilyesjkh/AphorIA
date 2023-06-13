import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    let model = 'davinci'; // Default model is 'nietzsche'

    if (req.body.model === 'fontaine') {
      model = 'davinci:ft-personal-2023-06-12-21-22-01';
    } else if (req.body.model === 'nietzsche') {
      model = 'davinci:ft-personal-2023-06-05-22-50-42';
    }

    const gptResponse = await openai.createCompletion({
      model,
      prompt: req.body.text,
      max_tokens: parseInt(req.body.max_tokens),
      temperature: parseFloat(req.body.temperature),
    });

    res.status(200).json(gptResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred with the OpenAI API.' });
  }
}
