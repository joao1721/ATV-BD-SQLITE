import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateCliente } from '../../db/db';

export default function EditarClienteScreen({ route, navigation }) {
    const { cliente, telefones, tipos } = route.params;
    const [nome, setNome] = useState(cliente.nome);
    const [dataNasc, setDataNasc] = useState(cliente.data_nasc);
    const [telefonesEdit, setTelefonesEdit] = useState(telefones);
    const [tiposEdit, setTiposEdit] = useState(tipos);

    const handleUpdateCliente = () => {
        console.log("Cliente ID:", cliente.id);
        console.log("Nome:", nome);
        console.log("Data de Nascimento:", dataNasc);
        console.log("Telefones Editados:", telefonesEdit);
        console.log("Tipos Editados:", tiposEdit);
        
        updateCliente(cliente.id, nome, dataNasc, telefonesEdit, tiposEdit, rowsAffected => {
            if (rowsAffected > 0) {
                
                const clienteAtualizado = { ...cliente, nome, data_nasc: dataNasc };
                const telefonesAtualizados = telefonesEdit.map((telefone, index) => ({
                    telefone,
                    tipo: tiposEdit[index]
                }));
                navigation.navigate('ListScreen', { cliente: clienteAtualizado, telefones: telefonesAtualizados });
            }
        });
    };

    const handleAddTelefone = () => {
        setTelefonesEdit([...telefonesEdit, '']);
        setTiposEdit([...tiposEdit, '']);
    };

    const handleTelefoneChange = (index, value) => {
        const newTelefones = [...telefonesEdit];
        newTelefones[index] = value;
        setTelefonesEdit(newTelefones);
    };

    const handleTipoChange = (index, value) => {
        const newTipos = [...tiposEdit];
        newTipos[index] = value;
        setTiposEdit(newTipos);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />
            <Text style={styles.label}>Data de Nascimento:</Text>
            <TextInput
                style={styles.input}
                value={dataNasc}
                onChangeText={setDataNasc}
            />
            <Text style={styles.label}>Telefones:</Text>
            {telefonesEdit.map((telefone, index) => (
                <View key={index}>
                    <TextInput
                        style={styles.input}
                        value={telefone}
                        onChangeText={(value) => handleTelefoneChange(index, value)}
                    />
                    <TextInput
                        style={styles.input}
                        value={tiposEdit[index]}
                        onChangeText={(value) => handleTipoChange(index, value)}
                    />
                </View>
            ))}
            <Button title="Adicionar Telefone" onPress={handleAddTelefone} />
            <Button title="Salvar" onPress={handleUpdateCliente} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
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
