// services/emailService.js
const nodemailer = require('nodemailer');

// Atenção: coloque suas credenciais em variáveis de ambiente no .env (ou no Docker, se estiver usando).
// Exemplo no .env (não comite essas infos):
// EMAIL_HOST=smtp.gmail.com
// EMAIL_PORT=587
// EMAIL_USER=seu.email@gmail.com
// EMAIL_PASS=suaSenhaAppOuOAuthToken

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: false, // true para 465, false para outras portas (587, 2525 etc)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envia um e-mail com OTP para o destinatário.
 * @param {string} to      - Destinatário (e-mail de destino).
 * @param {string} subject - Assunto do e-mail.
 * @param {string} text    - Corpo do e-mail em texto plano.
 */
async function enviarEmail(to, subject, text) {
  const mailOptions = {
    from: `"Sua Aplicação" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    // Se quiser HTML, pode adicionar um campo html: "<b>...</b>"
  };

  // Retorna promise para aguardar no controller
  return transporter.sendMail(mailOptions);
}

module.exports = {
  enviarEmail,
};
