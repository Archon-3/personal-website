const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // to serve your html/css/js files

// Email POST route
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Transporter config (use your email and app password)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abebeabenezer808@gmail.com',
            pass: 'your-app-password' // NOT your normal password
        }
    });

    const mailOptions = {
        from: email,
        to: 'abebeabenezer808@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        text: `From: ${name} (${email})\n\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
