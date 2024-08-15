// server.js
import express from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import { config } from "dotenv";
import OpenAI from 'openai'; // Import OpenAI

// Load environment variables from .env file
config();

const app = express();
const PORT = 3500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Initialize OpenAI
const client = new OpenAI({
    apiKey: process.env.OpenAiKey, // Ensure your .env has OpenAiKey
});

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/home/", (req, res) => {
    res.render("index");
});

app.get("/aboutus/", (req, res) => {
    res.render("aboutus");
});

app.get('/bmi/', (req, res) => {
    res.render("bmi");
});

app.get('/breakfast/', (req, res) => {
    res.render('breakfast');
});

app.get('/contact/', (req, res) => {
    res.render('contact');
});

app.get('/dinner/', (req, res) => {
    res.render('dinner');
});

app.get('/lunch/', (req, res) => {
    res.render('lunch');
});

app.get('/plans/', (req, res) => {
    res.render('plans');
});

app.get('/chat/', (req, res) => {
    res.render('chat');
});

// Endpoint to handle chat messages
app.post('/ask-me', async (req, res) => {
    const userMessage = req.body.message; // Get the user message from the request body
    console.log(userMessage);

    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: userMessage }],
            model: 'gpt-3.5-turbo',
        });

        const botMessage = chatCompletion.data.choices[0].message.content.trim(); // Adjusted for new OpenAI API
        res.json({ message: botMessage }); // Send the response back to the client
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        res.status(500).json({ error: "Error processing request" }); // Send error response
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
