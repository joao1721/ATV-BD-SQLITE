// PesquisarClientesScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text } from 'react-native';
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
      {}
      {resultadosPesquisa.map((cliente) => (
        <Text key={cliente.id}>
          Nome: {cliente.nome}, Telefone: {cliente.telefones.map((tel) => tel.telefone).join(', ')}
        </Text>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
