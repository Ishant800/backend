const { configDotenv } = require('dotenv')
const nodemailer = require('nodemailer')
configDotenv()
const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const mailOptions = {
        from: `"MeroRoom" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    }
    try {
        await transporter.sendMail(mailOptions)
        console.log("sucessfully email sent")
    } catch (error) {
        console.log(error)
    }}
module.exports = sendEmail


