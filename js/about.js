const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // DreamDiploma email address
        pass: 'your-email-password'  // Email password or app-specific password
    }
});

// POST route for form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Bütün sahələri doldurun.' });
    }

    const mailOptions = {
        from: email,
        to: 'dreamdiplomaorg@gmail.com', // Recipient email
        subject: `Yeni mesaj: ${name}`,
        text: `Ad: ${name}\nEmail: ${email}\nMesaj: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Mesaj göndərilə bilmədi.' });
        }
        res.status(200).json({ message: 'Mesaj uğurla göndərildi!' });
    });
});

// Function to open email client
function openEmailClient(event) {
    event.preventDefault(); // Formun default göndərilməsini dayandırır

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Bütün sahələri doldurun.');
        return;
    }

    // Mailto linkini yarat
    const mailtoLink = `mailto:dreamdiplomaorg@gmail.com?subject=Yeni mesaj: ${encodeURIComponent(name)}&body=Ad: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMesaj: ${encodeURIComponent(message)}`;

    // Mailto linkini aç
    window.location.href = mailtoLink;
}

// Start server
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} ünvanında işləyir.`);
});