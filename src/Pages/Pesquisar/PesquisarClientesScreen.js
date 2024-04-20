import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { getClientes } from '../../db/db';

export default function PesquisarClientesScreen({ navigation }) {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);

  const handlePesquisar = () => {
    if (termoPesquisa.trim() === '') {
      return;
    }
    getClientesByTermo(termoPesquisa.trim());
  };

  const getClientesByTermo = (termo) => {
    getClientes((clientes) => {
      const resultados = clientes.filter((cliente) => {
        const nomeMatch = cliente.nome.toLowerCase().includes(termo.toLowerCase());
        const telefoneMatch = cliente.telefones.some((telefone) =>
          telefone.telefone.includes(termo)
        );
        return nomeMatch || telefoneMatch;
      });
      setResultadosPesquisa(resultados);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome ou telefone do cliente"
        value={termoPesquisa}
        onChangeText={setTermoPesquisa}
        style={styles.input}
      />
      <Button title="Pesquisar" onPress={handlePesquisar} />
      <ScrollView style={styles.resultadosContainer}>
        {resultadosPesquisa.map((cliente) => (
          <View key={cliente.id} style={styles.clienteCard}>
            <Text style={styles.clienteNome}>Nome: {cliente.nome}</Text>
            <Text style={styles.clienteTelefone}>
              Telefone: {cliente.telefones.map((tel) => tel.telefone).join(', ')}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffd700', // gold
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000', // black
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000', // black
  },
  resultadosContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  clienteCard: {
    backgroundColor: '#000', // black
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  clienteNome: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#ffd700', // gold
  },
  clienteTelefone: {
    fontSize: 14,
    color: '#ffd700', // gold
  },
});
