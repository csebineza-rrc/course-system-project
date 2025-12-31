import nodemailer from 'nodemailer'; 
import dotenv from 'dotenv'; 

dotenv.config(); 

// Create transporter and send email 
export const sendEmail = async (to: string, subject: string, htmlContent: string) => { 
  try { 

    // Create a temporary Ethereal account 
    const tempAccount = await nodemailer.createTestAccount(); 

    // Create transporter using SMTP 
    const transporter = nodemailer.createTransport({ 
    host: 'smtp.ethereal.email', 
    port: 587, 
    auth: { 
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    } 
}); 

    // Send email 
    await transporter.sendMail({ 
      from: '"Academic Advisor" <academic-advisor@outlook.com>', 
      to, 
      subject, 
      html: htmlContent, 
    }); 

    console.log("Email sent successfully"); 
  } catch (error) { 
    console.error("Error sending email:", error); 
    if (error instanceof Error) { 
      throw error; 
    } 
    throw new Error("Failed to send email"); 
  } 
}; 
