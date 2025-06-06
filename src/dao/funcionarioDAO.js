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
}
module.exports = FuncionarioDAO;