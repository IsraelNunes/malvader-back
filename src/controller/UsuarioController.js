const UsuarioDAO = require('../dao/UsuarioDAO');
const bcrypt = require('bcrypt');
const gerarOtp = require('../helpers/gerarOtp');
const { enviarEmail } = require('../helpers/emailService');

class UsuarioController {
  static async getAll(req, res) {
    try {
      const usuarios = await UsuarioDAO.buscarTodos();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar usuários.' });
    }
  }

  static async create(req, res) {
    const { nome, cpf, data_nascimento, telefone, senha, tipo_usuario } = req.body;

    try {
      // Verificar se CPF já existe
      const CPF = await UsuarioDAO.buscarPorCpf(cpf);
      if (CPF) {
        return res.status(400).json({ erro: 'CPF já cadastrado.' });
      }

      // Criptografar senha
      const senhaHash = await bcrypt.hash(senha, 10);

      // Criar usuário
      const novoUsuario = await UsuarioDAO.criar({
        nome,
        cpf,
        data_nascimento,
        telefone,
        tipo_usuario, // 'CLIENTE' ou 'FUNCIONARIO'
        senha_hash: senhaHash
      });

      res.status(201).json({
        mensagem: 'Usuário criado com sucesso.',
        usuario: {
          idUsuario: novoUsuario.idUsuario,
          nome: novoUsuario.nome,
          cpf: novoUsuario.cpf,
          telefone: novoUsuario.telefone,
          data_nascimento: novoUsuario.data_nascimento,
          tipo_usuario: novoUsuario.tipo_usuario
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar usuário.' });
    }
  }

  static async sendOtp(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ erro: 'Informe o e-mail para envio do OTP.' });
    }

    try {
      // 1. Gere o OTP
      const otp = gerarOtp(6); // 6 dígitos
      const expiracao = 10 * 60 * 1000; // 10 minutos

      // 2. Armazene em memória (exemplo rápido)
      if (!global.OTPS) global.OTPS = {};
      global.OTPS[email] = {
        code: otp,
        expiresAt: Date.now() + expiracao
      };

      // 3. Envie o e-mail
      const assunto = 'Seu código de verificação (OTP)';
      const texto = `Olá,\n\nSeu código de verificação é: ${otp}\n\nEste código expira em 10 minutos.\n\nEquipe SeuApp`;
      await enviarEmail(email, assunto, texto);

      res.status(200).json({ mensagem: 'OTP enviado com sucesso para o e-mail informado.' });
    } catch (error) {
      console.error('Erro ao gerar/enviar OTP:', error);
      res.status(500).json({ erro: 'Falha ao enviar OTP. Tente novamente mais tarde.' });
    }
  }

  static async validateOtp(req, res) {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ erro: 'Informe e-mail e OTP para validação.' });
    }

    try {
      const registro = (global.OTPS && global.OTPS[email]) || null;
      if (!registro) {
        return res.status(400).json({ erro: 'Nenhum OTP encontrado para este e-mail.' });
      }

      if (Date.now() > registro.expiresAt) {
        delete global.OTPS[email];
        return res.status(400).json({ erro: 'OTP expirado.' });
      }

      if (registro.code !== otp) {
        return res.status(400).json({ erro: 'OTP inválido.' });
      }

      delete global.OTPS[email];
      res.status(200).json({ mensagem: 'OTP validado com sucesso.' });
    } catch (error) {
      console.error('Erro ao validar OTP:', error);
      res.status(500).json({ erro: 'Falha na validação do OTP. Tente novamente.' });
    }
  }
}

module.exports = UsuarioController;
