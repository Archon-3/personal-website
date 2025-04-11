// contact.js or server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Replace with your real Gmail and generated App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abebeabenezer808@gmail.com',
        pass: 'bkdajdquciibpiii' // This must be the 16-character app password!
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'abebeabenezer808@gmail.com',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error while sending email:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
