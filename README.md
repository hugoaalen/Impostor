# 🎭 El Impostor - Juego Social Web

Aplicación web del juego "El Impostor" con salas multijugador en tiempo real, temas personalizados y generación de palabras con IA.

## 🚀 Tecnologías Utilizadas (100% GRATUITAS)

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Node.js + Express (servidor backend seguro)
- **Real-time**: Firebase Realtime Database (plan gratuito)
- **IA**: Groq API con LLaMA 3.1 (gratuita)

## 📋 Configuración

### 1. Requisitos Previos

- Node.js v16+
- npm o yarn

### 2. Clonar y Instalar

```bash
git clone <tu-repo>
cd Impostor
npm install
```

### 3. Configurar Variables de Entorno

1. Copia `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. En `.env`, añade tu Groq API Key:
```env
GROQ_API_KEY=tu_groq_api_key_aqui
PORT=3000
```

Obtén tu API key gratuita en: [Groq Console](https://console.groq.com/keys)

### 4. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Activa **Realtime Database** en modo de prueba
4. En "Configuración del proyecto" > "Tus aplicaciones", crea una app web
5. Copia las credenciales y pégalas en `main.js` línea 6-13:

```javascript
const firebaseConfig = {
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    databaseURL: "https://tu-proyecto.firebaseio.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
```

### 5. Configurar Reglas de Firebase

En Firebase Console > Realtime Database > Reglas, pega:

```json
{
  "rules": {

    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["state"]
      }
    }
  }
}
```

## 🎮 Cómo Ejecutar

### Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env con tu Groq API Key
cp .env.example .env
# Edita .env y añade tu clave

# 3. Iniciar el servidor
npm start
# O con reload automático:
npm run dev

# 4. Abre http://localhost:3000 en tu navegador
```

### Despliegue en Producción

Para desplegar, tienes varias opciones. Si quieres usar Vercel (gratuito y sencillo para proyectos estáticos + serverless), sigue las instrucciones abajo.

**Despliegue en Vercel (recomendado para este repo)**

1. Crea un repo en GitHub y sube tu proyecto.
2. Entra a https://vercel.com y conecta tu cuenta de GitHub.
3. Importa el repo y usa los ajustes por defecto (Vercel detectará la carpeta root y servirá `index.html`).
4. En el panel del proyecto en Vercel, ve a **Settings > Environment Variables** y añade `GROQ_API_KEY` con el valor de tu API key (añádela tanto a `Production` como a `Preview` si quieres pruebas).
5. Opcional: añade `NODE_VERSION` si tu plataforma lo requiere, pero Vercel usa Node 18+ por defecto.

Si prefieres desplegar en otra plataforma que soporte Node.js, sigue los pasos habituales (Render, Railway, Heroku, etc.) y configura la variable de entorno `GROQ_API_KEY` en el panel de la plataforma.

**IMPORTANTE**: Nunca subas el archivo `.env` a GitHub. Usa las variables de entorno de tu plataforma de hosting.

## 🎮 Cómo Jugar

1. Accede a http://localhost:3000 (o tu dominio en producción)
2. Un jugador crea una sala
3. Los demás se unen con el código de 6 dígitos
4. El host elige un tema e inicia la partida
5. Cada jugador recibe su rol y palabra en secreto
6. Debaten durante 3 minutos
7. Votan para eliminar al impostor
8. ¡Descubren quién ganó!

## 📱 Características

- ✅ Multiplayer en tiempo real
- ✅ Salas privadas con código
- ✅ 6 temas predefinidos + temas personalizados
- ✅ Generación dinámica de palabras con IA
- ✅ Responsive (móvil y desktop)
- ✅ Sin necesidad de registro
- ✅ 100% gratuito
- ✅ **API Key de Groq protegida en backend**

## 🔐 Seguridad

La API Key de Groq está **protegida en el servidor backend** (`server.js`):
- ✅ Nunca se expone en el cliente (frontend)
- ✅ Se almacena en variables de entorno (`.env`)
- ✅ Seguro para subir a GitHub
- ✅ Las llamadas a IA se hacen a través de un endpoint seguro

## 🎯 Lógica de Impostores

- 3-4 jugadores → 1 impostor
- 5-7 jugadores → 2 impostores  
- 8-10 jugadores → 3 impostores

## 📝 Notas

- **Límites gratuitos de Firebase**: 1GB almacenamiento, 10GB/mes transferencia
- **Límites gratuitos de Groq**: 30 requests/minuto (más que suficiente)
- Si la IA falla, usa palabras predefinidas automáticamente

## 🐛 Solución de Problemas

**La IA no genera palabras:**
- Verifica tu API key de Groq
- Revisa la consola del navegador para errores
- El sistema usa palabras de respaldo automáticamente

**Los jugadores no se sincronizan:**
- Verifica la configuración de Firebase
- Asegúrate de tener conexión a internet
- Revisa las reglas de la base de datos

## 📄 Licencia

MIT - Usa, modifica y distribuye libremente

---

¡Disfruta el juego! 🎉
