const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function generateSummary(text) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-lite-001',
      messages: [
        {
          role: 'user',
          content: `Summarize this study material in simple, in clear bullet points,explain within 250 words, make it look good use emojis and other styling techniques to give better response:\n\n${text}`,
        },
      ],
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error('OpenRouter API error:', err);
    throw new Error('API call failed');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}