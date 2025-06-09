//CRUD de funcionários, autenticação e permissões.
const Usuario = require('../model/Usuario');
const Funcionario = require('../model/Funcionario');
class FuncionarioDAO {
  // Buscar todos os usuários
static async buscarTodos() {
    try {
      const funcionarios = await Funcionario.findAll({
  include: {
    model: Usuario,
    as: 'usuario',
    attributes: ['idUsuario', 'nome', 'CPF', 'telefone', 'data_nascimento', 'tipo_usuario']
    //
  }
});
      return funcionarios;
    } catch (error) {
      throw error;
    }
}

static async criar(dadosFuncionario) {
    try {
      const funcionario = await Funcionario.create(dadosFuncionario);
      return funcionario;
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
    const funcionario = await Funcionario.findOne({ where: { id_usuario: usuario.idUsuario } });
    if (!funcionario) return null;

    // Atualizar dados
    await usuario.update(dadosUsuario);
    await funcionario.update(dadosCliente);

    return {
      usuarioAtualizado: usuario,
      funcionarioAtualizado: funcionario
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
    const funcionario = await Funcionario.findOne({ where: { id_usuario: usuario.idUsuario } });
    if (!funcionario) return null;

    // Deletar cliente e depois o usuário
    await funcionario.destroy();
    await usuario.destroy();

    return true;
  } catch (error) {
    throw error;
  }
}
}
module.exports = FuncionarioDAO;