import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required' });
  }

  // Gmail SMTP credentials from environment variables
  const user = process.env.GMAIL_USER || 'zenbytelabsofficial@gmail.com';
  const pass = process.env.GMAIL_PASS || 'ddjm soai qwqz qaky';

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });

  const mailOptions = {
    from: `"ZenByteLabs Portfolio" <${user}>`,
    to: 'zenbytelabsofficial@gmail.com', // Receive inquiries here
    replyTo: email,                      // Easily reply back to sender
    subject: subject || `New Portfolio Inquiry from ${name}`,
    text: `You have received a new contact submission from your portfolio:

Name: ${name}
Email: ${email}
Subject/Objective: ${subject || 'Not specified'}

Message:
${message}
`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #00FFD1; padding-bottom: 10px; font-weight: 900;">NEW INQUIRY TRANSMITTED</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject/Objective:</strong> ${subject || 'General Inquiry'}</p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px; font-family: monospace; white-space: pre-wrap; color: #334155;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <footer style="margin-top: 30px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          ZenByteLabs Security Protocol Active • Sent from Portfolio Contact Form
        </footer>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send message: ' + error.message });
  }
}
