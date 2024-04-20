import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { updateCliente } from '../../db/db';

export default function EditarClienteScreen({ route, navigation }) {
    const { cliente, telefones, tipos } = route.params;
    const [nome, setNome] = useState(cliente.nome);
    const [dataNasc, setDataNasc] = useState(cliente.data_nasc);
    const [telefonesEdit, setTelefonesEdit] = useState(telefones);
    const [tiposEdit, setTiposEdit] = useState(tipos);

    const handleUpdateCliente = () => {
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
            <TouchableOpacity style={styles.button} onPress={handleAddTelefone}>
                <Text style={styles.buttonText}>Adicionar Telefone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleUpdateCliente}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        color: '#ffd700',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#fff',
    },
    button: {
        width: '100%',
        backgroundColor: '#ffd700',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textTransform: 'uppercase',
    },
});
