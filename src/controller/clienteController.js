const ClienteDAO = require('../dao/clienteDAO');
const UsuarioDAO = require('../dao/UsuarioDAO');
const bcrypt = require('bcrypt');
class ClienteController {
  static async getAll(req, res) {
    try {
      const clientes = await ClienteDAO.buscarTodos();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar usuários.' });
    }
  }
static async create(req, res) {

    const { usuario, cliente } = req.body;
    try {
      // Verificar se CPF já existe
      const cpf = usuario.cpf;
      const CPF = await UsuarioDAO.buscarPorCpf(cpf);
      if (CPF) {
        return res.status(400).json({ erro: 'CPF já cadastrado' });
      }

      // Criptografar senha
      const senhaHash = await bcrypt.hash(usuario.senha, 10);

      // Criar usuário
      const novoUsuario = await UsuarioDAO.criar({
        nome: usuario.nome,
        CPF: usuario.cpf,
        data_nascimento: usuario.data_nascimento,
        telefone: usuario.telefone,
        tipo_usuario: 'CLIENTE',
        senha_hash: senhaHash
      });

      // Criar cliente vinculado
      const novoCliente = await ClienteDAO.criar({
        score_credito: cliente.score_credito || 0,
        Usuario_idUsuario: novoUsuario.idUsuario
      });

      res.status(201).json({
        mensagem: 'Cliente criado com sucesso',
        cliente: {
          id_cliente: novoCliente.id_cliente,
          score_credito: novoCliente.score_credito,
          usuario: {
            idUsuario: novoUsuario.idUsuario,
            nome: novoUsuario.nome,
            cpf: novoUsuario.cpf,
            telefone: novoUsuario.telefone
          }
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar cliente' });
    }
  }
}
module.exports = ClienteController;