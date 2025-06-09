// helpers/gerarOtp.js
/**
 * Gera uma string numérica de tamanho “tamanho” (padrão 6) para usar como OTP.
 */
function gerarOtp(tamanho = 6) {
  const dígitos = '0123456789';
  let otp = '';
  for (let i = 0; i < tamanho; i++) {
    otp += dígitos[Math.floor(Math.random() * dígitos.length)];
  }
  return otp;
}

module.exports = gerarOtp;
