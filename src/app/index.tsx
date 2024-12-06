import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function Index() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
      }}>
        <Text>
          Digite uma palavra em inglês
        </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          paddingHorizontal: 8,
          backgroundColor: '#fff',
        }}>
        <TextInput
          onChangeText={setName}
          style={{
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 10,
            fontSize: 16,
          }}
          placeholder="Digite uma palavra"
        />
        <TouchableOpacity
          onPress={() => {
            if (!name) {
              setError('Você precisa digitar uma palavra')
              return
            }
            setError('')
            router.navigate({
              pathname: '/word/[name]',
              params: { name },
            })
          }}
          style={{
            padding: 8,
          }}>
          <Search size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: 'red',
          marginTop: 5
        }}>
        {error}
      </Text>
    </View>
  );
}
