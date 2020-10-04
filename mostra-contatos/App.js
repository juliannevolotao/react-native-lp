import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([{}]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nameSearch, setNameSearch] = useState('');

  const handleSearchContacts = () => {
    setErrorMsg('');
    console.log('__________________________');
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== 'granted') {
        return setErrorMsg('Permissão negada pelo usuário!');
      }
      else {
        try {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name]
          });
          if (data.length > 0) {
            console.log('if');
            let findedContacts = [];

            data.forEach(contact => {
              if(contact.name.toLowerCase().includes(nameSearch.toLowerCase())) {
                console.log(contact);
                const number = contact.phoneNumbers
                const contactData = {
                  is: contact.id,
                  type: contact.contactType,
                  name: contact.name,
                  number1: number !== undefined ? number[0].number || number[1].number : 'Nenhum número salvo',
                }
                findedContacts.push(contactData);
              }
            });
            console.log(findedContacts.length);
            if(findedContacts.length > 0) {
              console.log('sucesso');
              setContacts(findedContacts);
              console.log(contacts);
            }
            else {
              return setErrorMsg('Nenhum dado encontrado.');
            }
          }
          else {
            return setErrorMsg('Nenhum dado encontrado.');
          }
        } 
        catch (err) {
          console.log(err);
          return setErrorMsg('Algum erro ocorreu!');
        }
      }  
    })();
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Procurar contatos</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Informe o nome </Text>
          <TextInput 
            style={styles.input}
            value={nameSearch} 
            onChangeText={text => setNameSearch(text)} />
        </View>

        <Button 
          color={'#25db86'} 
          title={"Procurar"} 
          onPress={() => handleSearchContacts()} />
        <Text style={styles.msg}> {errorMsg} </Text>
      </SafeAreaView>
      

      <ScrollView style={styles.contacts}>
        {contacts.map(contact => 
          <View key={contact.id} style={styles.contactContainer}>
            <Text style={styles.contactName}> {contact.name} </Text>
            <Text style={styles.contactType}> Type: {contact.type} </Text>
            <Text style={styles.contactPhone}> {contact.number1} </Text>
          </View>
        )}
      </ScrollView>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    paddingTop: 80
  },
  title: {
    fontSize: 24,
    color: '#25db86',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 20
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  label: {
    color: '#9c9c9c',
    fontSize: 13,
  },
  input: {
    width: 330,
    height: 60,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 4,
    marginBottom: 30,
    padding: 10,
    fontSize: 20
  },
  msg: {
    position: "absolute",
    bottom: 20,
    fontSize: 12,
    color: '#9c9c9c',
    width: '100%',
  },
  contacts: {
    display: "flex",
    borderColor: '#d1d1d1',
    borderWidth: 1,
    width: '100%',
    marginTop: 40,
    backgroundColor: '#f0f0f0',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  contactContainer: {
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    padding: 15
  },
  contactName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#25db86',
  },
  contactType: {
    fontSize: 12,
    color: '#9c9c9c',
    marginBottom: 10,
  },
  contactPhone: {
    // fontWeight: 'bold',
    color: '#059e57',
    fontSize: 16
  }
});
