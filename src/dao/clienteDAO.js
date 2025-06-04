const Usuario = require('../model/Usuario');
const Cliente = require('../model/Cliente');
class ClienteDAO {
  // Buscar todos os usuários
  static async buscarTodos() {
    try {
      const clientes = await Cliente.findAll({
  include: {
    model: Usuario,
    as: 'usuario',
    attributes: ['idUsuario', 'nome', 'CPF', 'telefone', 'data_nascimento', 'tipo_usuario']
  }
});
      return clientes;
    } catch (error) {
      throw error;
    }
}
static async criar(dadosCliente) {
    try {
      const cliente = await Cliente.create(dadosCliente);
      return cliente;
    } catch (error) {
      throw error;
    }
  }
  static async buscarPorCpf(cpf) {
    return await Usuario.findOne({ where: { CPF: cpf } });
  }
}
module.exports = ClienteDAO;