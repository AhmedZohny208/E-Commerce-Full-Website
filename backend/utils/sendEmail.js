const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID =
  '612837771786-nc00jnj6pjou9dlqr84gntfg10iukdtf.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN =
  '1//04y1eCKY5fzfsCgYIARAAGAQSNwF-L9Ir27FAdJqdt_otneOwPJAUGdBCZvut7Lzb0DincrrD1VMxwQMGuOV3r8qoyaEVrBoBMNo'

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendEmail = async (options) => {
  const accessToken = await oAuth2Client.getAccessToken()
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'asfmz753@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  })

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  const result = await transporter.sendMail(message)
  return result
}

module.exports = sendEmail
