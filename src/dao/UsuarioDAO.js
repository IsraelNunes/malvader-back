const Usuario = require('../model/Usuario');

class UsuarioDAO {
  // Buscar todos os usuários
  static async buscarTodos() {
    try {
      const usuarios = await Usuario.findAll();
      return usuarios;
    } catch (error) {
      throw error;
    }
}
static async criar(dadosUsuario) {
    try {
      const cliente = await Usuario.create(dadosUsuario);
      return cliente;
    } catch (error) {
      throw error;
    }
  }
   static async buscarPorCpf(cpf) {
    return await Usuario.findOne({ where: { CPF: cpf } });
  }
}
module.exports = UsuarioDAO;