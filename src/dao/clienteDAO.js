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
static async atualizar(cpf, dadosUsuario, dadosCliente) {
  try {
    // Buscar o usuário pelo CPF
    const usuario = await Usuario.findOne({ where: { CPF: cpf } });
    if (!usuario) return null;

    // Buscar o cliente vinculado ao usuário
    const cliente = await Cliente.findOne({ where: { Usuario_idUsuario: usuario.idUsuario } });
    if (!cliente) return null;

    // Atualizar dados
    await usuario.update(dadosUsuario);
    await cliente.update(dadosCliente);

    return {
      usuarioAtualizado: usuario,
      clienteAtualizado: cliente
    };
  } catch (error) {
    throw error;
  }
}

static async deletar(cpf) {
  try {
    // Buscar o usuário pelo CPF
    const usuario = await Usuario.findOne({ where: { CPF: cpf } });
    if (!usuario) return null;

    // Buscar o cliente vinculado
    const cliente = await Cliente.findOne({ where: { Usuario_idUsuario: usuario.idUsuario } });
    if (!cliente) return null;

    // Deletar cliente e depois o usuário
    await cliente.destroy();
    await usuario.destroy();

    return true;
  } catch (error) {
    throw error;
  }
}
}
module.exports = ClienteDAO;