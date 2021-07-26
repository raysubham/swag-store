import { createTransport, getTestMessageUrl } from 'nodemailer'

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

function emailContents(text: string) {
  return `
    <div style="
    border:1px solid red;
    padding:20px;
    font-family:sans-serif;
    line-height:2;
    font-size:20px; 
    ">
    <h3>Hello Swagger!</h3>
    <p>${text}</p>
    <p>Regards, Swag Store Team</p>
    </div>
    `
}

interface mailResponse {
  accepted?: string[] | null
  rejected?: null[] | null
  envelopeTime: number
  messageTime: number
  messageSize: number
  response: string
  envelope: Envelope
  messageId: string
}
interface Envelope {
  from: string
  to?: string[] | null
}

export async function sendPasswordResetEmail(
  token: string,
  to: string
): Promise<void> {
  const info = (await transporter.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your Password Reset token!',
    html: emailContents(`Your passord reset token is here
    <a href="${process.env.FRONTEND_URL}/reset?token=${token}">Click Here to reset!</a>
    `),
  })) as mailResponse

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`Mail Sent! Preview it at ${getTestMessageUrl(info)}`)
  }
}
