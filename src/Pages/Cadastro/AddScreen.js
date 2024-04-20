import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <Text style={styles.label}>Data de Nascimento:</Text>
      <TextInput
        placeholder="Data de Nascimento"
        value={dataNasc}
        onChangeText={setDataNasc}
        style={styles.input}
      />
      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
      />
      <Text style={styles.label}>Tipo:</Text>
      <TextInput
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={cadastrarCliente}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  label: {
    color: '#ffd700',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#ffd700',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
