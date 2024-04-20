import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('clientes.db');

export default function init() {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, data_nasc TEXT);',
      // `DROP TABLE IF EXISTS clientes`,
      [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
      () => console.log('Tabela criada'),//retorno de  sucesso
      // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
      (_, error) => console.error(error) //retorno de  erro
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS telefones (id INTEGER PRIMARY KEY AUTOINCREMENT, telefone TEXT, tipo TEXT);',
      // `DROP TABLE IF EXISTS clientes`,
      [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
      () => console.log('Tabela criada'),//retorno de  sucesso
      // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
      (_, error) => console.error(error) //retorno de  erro
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS cliente_telefone (cliente_id INTEGER, telefone_id INTEGER, FOREIGN KEY(cliente_id) REFERENCES clientes(id), FOREIGN KEY(telefone_id) REFERENCES telefones(id), PRIMARY KEY (cliente_id, telefone_id));',
      // `DROP TABLE IF EXISTS clientes`,
      [], //[]: Este é o array de parâmetros. Como não estamos usando nenhum parâmetro na consulta SQL, deixamos esse array vazio.
      () => console.log('Tabela criada'),//retorno de  sucesso
      // '_' É um parâmetro que representa o resultado da transação SQL, por convenção utiliza-se o underscore. para indicar que estamos ignorando esse valor.
      (_, error) => console.error(error) //retorno de  erro
    );
  });
};

export function insertCliente(nome, data_nasc, telefone, tipo, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO clientes (nome, data_nasc) VALUES (?, ?);',
      [nome, data_nasc],
      (_, result) => {
        const clienteId = result.insertId;
        tx.executeSql(
          'INSERT INTO telefones (telefone, tipo) VALUES (?, ?);',
          [telefone, tipo],
          (_, result) => {
            const telefoneId = result.insertId;
            tx.executeSql(
              'INSERT INTO cliente_telefone (cliente_id, telefone_id) VALUES (?, ?);',
              [clienteId, telefoneId],
              () => {
                callback(clienteId);
              },
              (_, error) => {
                console.error('Erro ao relacionar cliente e telefone:', error);
              }
            );
          },
          (_, error) => {
            console.error('Erro ao inserir telefone:', error);
          }
        );
      },
      (_, error) => {
        console.error('Erro ao inserir cliente:', error);
      }
    );
  });
}


export function getClientes(callback) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT clientes.id, clientes.nome, clientes.data_nasc, telefones.telefone, telefones.tipo FROM clientes LEFT JOIN cliente_telefone ON clientes.id = cliente_telefone.cliente_id LEFT JOIN telefones ON cliente_telefone.telefone_id = telefones.id;',
      [],
      (_, result) => {
        // Agrupando os telefones por cliente
        const groupedClientes = result.rows._array.reduce((acc, curr) => {
          const { id, nome, data_nasc, telefone, tipo } = curr;
          if (!acc[id]) {
            acc[id] = { id, nome, data_nasc, telefones: [] };
          }
          if (telefone && tipo) {
            acc[id].telefones.push({ telefone, tipo });
          }
          return acc;
        }, {});
        const clientesArray = Object.values(groupedClientes);
        callback(clientesArray);
      },
      (_, error) => console.error(error)
    );
  });
}

export const getTelefonesByClienteId = (clienteId, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT telefones.telefone, telefones.tipo FROM telefones JOIN cliente_telefone ON telefones.id = cliente_telefone.telefone_id WHERE cliente_telefone.cliente_id = ?;',
      [clienteId],
      (_, result) => {
        callback(result.rows._array);
      },
      (_, error) => {
        console.error('Erro ao obter telefones do cliente:', error);
      }
    );
  });
};


export function deleteCliente(clienteId, callback) {
  db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM clientes WHERE id = ?;',
          [clienteId],
          (_, result) => {
              callback(result.rowsAffected);
          },
          (_, error) => {
              console.error('Erro ao excluir cliente:', error);
          }
      );
  });
}

export function updateCliente(clienteId, nome, data_nasc, telefones, tipos, callback) {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE clientes SET nome = ?, data_nasc = ? WHERE id = ?;',
      [nome, data_nasc, clienteId],
      (_, result) => {
        // Limpar os telefones associados ao cliente
        tx.executeSql(
          'DELETE FROM telefones WHERE id IN (SELECT telefone_id FROM cliente_telefone WHERE cliente_id = ?);',
          [clienteId],
          () => {
            // Inserir os novos telefones
            telefones.forEach((telefone, index) => {
              tx.executeSql(
                'INSERT INTO telefones (telefone, tipo) VALUES (?, ?);',
                [telefone, tipos[index]],
                (_, result) => {
                  const telefoneId = result.insertId;
                  // Relacionar o novo telefone ao cliente
                  tx.executeSql(
                    'INSERT INTO cliente_telefone (cliente_id, telefone_id) VALUES (?, ?);',
                    [clienteId, telefoneId],
                    () => {
                      // Verificar se é a última iteração para chamar o callback
                      if (index === telefones.length - 1) {
                        callback(result.rowsAffected);
                      }
                    },
                    (_, error) => {
                      console.error('Erro ao relacionar cliente e telefone:', error);
                    }
                  );
                },
                (_, error) => {
                  console.error('Erro ao inserir telefone:', error);
                }
              );
            });
          },
          (_, error) => {
            console.error('Erro ao limpar telefones antigos:', error);
          }
        );
      },
      (_, error) => {
        console.error('Erro ao atualizar cliente:', error);
      }
    );
  });
}