import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Servir archivos estáticos

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
    console.error('ERROR: GROQ_API_KEY no está definida en .env');
    process.exit(1);
}

// Endpoint para generar palabras con IA
app.post('/api/generate-words', async (req, res) => {
    try {
        const { theme } = req.body;

        if (!theme) {
            return res.status(400).json({ error: 'Theme es requerido' });
        }

        const prompt = `Genera dos palabras relacionadas con el tema "${theme}":
1. Una palabra específica para los ciudadanos
2. Una palabra relacionada pero ambigua para los impostores

Responde SOLO con un JSON en este formato exacto:
{"palabra_jugadores": "palabra1", "palabra_impostor": "palabra2"}`;

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
            throw new Error(`Groq API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        const jsonMatch = content.match(/\{[^}]+\}/);

        if (jsonMatch) {
            const words = JSON.parse(jsonMatch[0]);
            res.json(words);
        } else {
            throw new Error('Formato de respuesta inválido');
        }
    } catch (error) {
        console.error('Error al generar palabras:', error);
        res.status(500).json({ 
            error: 'Error generando palabras',
            fallback: true 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🎭 Servidor Impostor corriendo en http://localhost:${PORT}`);
});
