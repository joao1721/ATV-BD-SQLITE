import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/Pages/Home/HomeScreen';
import ListScreen from './src/Pages/Exibir/ListScreen';
import AddScreen from './src/Pages/Cadastro/AddScreen';
import PesquisarClientesScreen from './src/Pages/Pesquisar/PesquisarClientesScreen';
import EditarClienteScreen from './src/Pages/Editar/editarScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
        <Stack.Screen name="PesquisarClientesScreen" component={PesquisarClientesScreen} />
        <Stack.Screen name="EditarClienteScreen" component={EditarClienteScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default AppNavigator;
