// testModel.js
const sequelize = require('../src/util/database');
const Usuario = require('../src/model/Usuario');
const PermissaoUsuario = require('../src/model/PermissaoUsuario'); // ajuste o caminho se necessário

async function testarPermissaoUsuario() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida.');

    // Sincroniza as tabelas (cria ou altera)
    await sequelize.sync({ alter: true });
    console.log('📦 Tabelas sincronizadas com sucesso.');

    // Busca um usuário existente
    const usuarioExistente = await Usuario.findOne();

    if (!usuarioExistente) {
      console.log('⚠️ Nenhum usuário encontrado no banco. Por favor, crie um usuário primeiro.');
      return;
    }

    console.log('👤 Usuário existente encontrado:', usuarioExistente.idUsuario);

    // Cria permissão para o usuário existente
    const permissaoUsuario = await PermissaoUsuario.create({
      Usuario_idUsuario: usuarioExistente.idUsuario,
      permissao_id_role: 3, // Ajuste conforme permissão válida no seu banco
    });

    console.log('🔐 Permissão do usuário criada:', permissaoUsuario.id_permissao_usuario);

  } catch (err) {
    console.error('❌ Erro ao testar os modelos:', err);
  } finally {
    await sequelize.close();
    console.log('🔒 Conexão encerrada.');
  }
}

testarPermissaoUsuario();
