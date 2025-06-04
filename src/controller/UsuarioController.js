const UsuarioDAO = require('../dao/UsuarioDAO');
const bcrypt = require('bcrypt');

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
        return res.status(400).json({ erro: 'CPF já cadastrado' });
      }

      // Criptografar senha
      const senhaHash = await bcrypt.hash(senha, 10);

      // Criar usuário
      const novoUsuario = await UsuarioDAO.criar({
        nome,
        CPF: cpf,
        data_nascimento,
        telefone,
        tipo_usuario, // 'CLIENTE' ou 'FUNCIONARIO'
        senha_hash: senhaHash
      });

      res.status(201).json({
        mensagem: 'Usuário criado com sucesso',
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
      res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
  }
}
module.exports = UsuarioController;