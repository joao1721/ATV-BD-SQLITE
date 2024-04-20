
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { getClientes, deleteCliente } from '../../db/db';

export default function ListScreen({ navigation }) {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = () => {
            getClientes(rows => {
                setClientes(rows);
            });
        };
        fetchClientes();
    }, []);

    const handleDeleteCliente = (clienteId) => {
        deleteCliente(clienteId, rowsAffected => {
            if (rowsAffected > 0) {
                const updatedClientes = clientes.filter(cliente => cliente.id !== clienteId);
                setClientes(updatedClientes);
            }
        });
    };

    const handleEditCliente = (cliente) => {
       
        const telefones = cliente.telefones.map(telefone => telefone.telefone);
        
        const tipos = cliente.telefones.map(telefone => telefone.tipo);
        navigation.navigate('EditarClienteScreen', { cliente, telefones, tipos });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {clientes.map((cliente, index) => (
                <View key={index} style={styles.clienteCard}>
                    <Text style={styles.clienteNome}>{cliente.nome}</Text>
                    <Text style={styles.clienteInfo}>Data de Nascimento: {cliente.data_nasc}</Text>
                    
                    {cliente.telefones.map((telefone, telIndex) => (
                        <Text key={telIndex} style={styles.clienteInfo}>
                            Telefone: {telefone.telefone} - Tipo: {telefone.tipo}
                        </Text>
                    ))}

                    <View style={styles.iconsContainer}>
                        <TouchableOpacity onPress={() => handleEditCliente(cliente)}>
                            <FontAwesome name="edit" size={24} color="blue" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteCliente(cliente.id)}>
                            <FontAwesome name="trash" size={24} color="red" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: 'black'
    },
    clienteCard: {
        backgroundColor: 'gold',
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        width: '90%',
    },
    clienteNome: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
    },
    clienteInfo: {
        fontSize: 16,
        color: 'black',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    icon: {
        marginLeft: 10,
    },
});
