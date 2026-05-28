import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import nodemailer from 'nodemailer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'api-server',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/contact' && req.method === 'POST') {
              let body = ''
              req.on('data', chunk => {
                body += chunk
              })
              req.on('end', async () => {
                try {
                  const { name, email, message, subject } = JSON.parse(body)

                  if (!name || !email || !message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'All fields (name, email, message) are required' }))
                    return
                  }

                  const user = env.GMAIL_USER || 'zenbytelabsofficial@gmail.com'
                  const pass = env.GMAIL_PASS || 'ddjm soai qwqz qaky'

                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: user,
                      pass: pass
                    }
                  })

                  const mailOptions = {
                    from: `"ZenByteLabs Portfolio" <${user}>`,
                    to: 'zenbytelabsofficial@gmail.com',
                    replyTo: email,
                    subject: subject || `New Portfolio Inquiry from ${name}`,
                    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                  }

                  await transporter.sendMail(mailOptions)
                  res.writeHead(200, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ success: true, message: 'Sent successfully' }))
                } catch (err) {
                  console.error('Local API Error:', err)
                  res.writeHead(500, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ error: err.message }))
                }
              })
            } else {
              next()
            }
          })
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    }
  }
})
