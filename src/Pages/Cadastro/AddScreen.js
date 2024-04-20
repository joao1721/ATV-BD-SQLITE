import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { insertCliente } from '../../db/db';

export default function AddScreen() {
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');

  const cadastrarCliente = () => {
    insertCliente(nome, dataNasc, telefone, tipo, id => {
      console.log(`Cliente cadastrado com ID: ${id}`);
      // Limpar os campos após o cadastro
      setNome('');
      setDataNasc('');
      setTelefone('');
      setTipo('');
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Data de Nascimento"
        value={dataNasc}
        onChangeText={setDataNasc}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
      />
      <TextInput
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
        style={styles.input}
      />
      <Button title="Cadastrar" onPress={cadastrarCliente} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
