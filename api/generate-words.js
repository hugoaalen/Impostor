export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { theme } = req.body || {};
    if (!theme) return res.status(400).json({ error: 'theme is required' });

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY not set');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const prompt = `Genera dos palabras relacionadas con el tema "${theme}":\n1. Una palabra específica para los ciudadanos\n2. Una palabra relacionada pero ambigua para los impostores\n\nResponde SOLO con un JSON en este formato exacto:\n{"palabra_jugadores": "palabra1", "palabra_impostor": "palabra2"}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 100
      })
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('Groq API error', response.status, text);
      return res.status(502).json({ error: 'Groq API error' });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || '';
    const jsonMatch = content.match(/\{[^}]+\}/);

    if (jsonMatch) {
      const words = JSON.parse(jsonMatch[0]);
      return res.status(200).json(words);
    }

    // Fallback if parsing fails
    console.warn('Groq response format unexpected, using fallback');
    return res.status(200).json({ palabra_jugadores: 'Pizza', palabra_impostor: 'Comida italiana' });
  } catch (err) {
    console.error('Error in API function:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
