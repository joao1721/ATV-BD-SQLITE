import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import init from '../../db/db';


export default function HomeScreen({ navigation }) {

  useEffect(() => {
    init()
  } , []);

  return (
    <View style={styles.container}>
      <Button
        title="Lista de Clientes"
        onPress={() => navigation.navigate('ListScreen')}
        style={styles.button}
      />
      <Button
        title="Add  Clientes"
        onPress={() => navigation.navigate('AddScreen')}
        style={styles.button}
      />
      <Button
        title="pesquisa  Clientes"
        onPress={() => navigation.navigate('PesquisarClientesScreen')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black'
  },
  button: {
    width: '80%',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});



