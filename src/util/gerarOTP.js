function gerarOTP(tamanho = 6) {
  let otp = '';
  for (let i = 0; i < tamanho; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

module.exports = gerarOTP;
