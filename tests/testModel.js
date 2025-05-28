// testModels.js
const sequelize = require('../src/util/database');
const Usuario = require('../src/model/Usuario');
const Cliente = require('../src/model/Cliente');
const Funcionario = require('../src/model/Funcionario');
const Conta = require('../src/model/Conta');

async function testarTudo() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida.');

    // Criação das tabelas se não existirem (e atualiza estrutura se precisar)
    await sequelize.sync({ alter: true });
    console.log('📦 Tabelas sincronizadas com sucesso.');

    // Criar usuário base
    const usuario = await Usuario.create({
      nome: 'João da Silva',
      CPF: '12345678900',
      data_nascimento: '1985-03-15',
      telefone: '11988887777',
      tipo_usuario: 'cliente', // ou 'funcionario'
      senha_hash: 'senha123',
    });

    console.log('👤 Usuário criado:', usuario.idUsuario);

    // Criar cliente vinculado
    const cliente = await Cliente.create({
      score_credito: 750.50,
      Usuario_idUsuario: usuario.idUsuario
    });

    console.log('🧍 Cliente criado:', cliente.id_cliente);

    // Criar funcionário vinculado (opcional, se o usuário for do tipo funcionario)
    const funcionario = await Funcionario.create({
      cargo: 'Analista',
      salario: 4500.00,
      Usuario_idUsuario: usuario.idUsuario
    });

    console.log('🧑‍💼 Funcionário criado:', funcionario.id_funcionario);

    // Criar conta vinculada ao usuário
    const conta = await Conta.create({
      numero_conta: '9876543210',
      saldo: 1200.75,
      tipo_conta: 'corrente',
      Usuario_idUsuario: usuario.idUsuario
    });

    console.log('💳 Conta criada:', conta.id_conta);

  } catch (err) {
    console.error('❌ Erro ao testar os modelos:', err);
  } finally {
    await sequelize.close();
    console.log('🔒 Conexão encerrada.');
  }
}

testarTudo();
