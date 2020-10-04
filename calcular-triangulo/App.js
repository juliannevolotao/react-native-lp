import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';



export default function App() {
  const [alturaTriangulo, setAlturaTriangulo] = React.useState('');
  const [baseTriangulo, setBaseTriangulo] = React.useState('');
  const [areaTriangulo, setAreaTriangulo] = React.useState(0);
  const [msg, setMsg] = React.useState('Preencha os valores e clique em calcular.');

  const handleCalcButton = (alt, bas) => {
    if (alt !== '' && bas !== '') {
      try {
        const area = (bas * alt) / 2;
        setAreaTriangulo(area);
        setMsg('');
      }
      catch (err) {
        setMsg('Algum erro ocorreu ao tentar calcular área do triângulo.');
      }
    }
    else {
      if (alt === '') {
        setMsg('Informe a altura do triângulo.');
      }
      else {
        setMsg('Informe a base do triângulo.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcular área do triângulo</Text>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Base: </Text>
          <TextInput 
            style={styles.input}
            value={baseTriangulo} 
            onChangeText={text => 
            setBaseTriangulo(text)} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}> Altura: </Text>
          <TextInput 
            style={styles.input}
            value={alturaTriangulo} 
            onChangeText={text => 
            setAlturaTriangulo(text)} />
        </View>
        
        <Button 
          onPress={() => handleCalcButton(alturaTriangulo, baseTriangulo)}
          color={'#7e47ff'}
          title="Calcular"/>
      </View>

      <View style={styles.result}>
        <Text style={styles.resultValue}> Área: {areaTriangulo}m² </Text>
        <Text style={styles.disclaimer}> {msg} </Text>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
  },
  content: {
    display: "flex",
    alignItems: "flex-end"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: "uppercase",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  label: {
    marginRight: 10,
    color: '#9c9c9c',
  },
  input: {
    width: 180,
    height: 50,
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 17
  },                       
  disclaimer: {
    fontSize: 12,
    color: '#7d7d7d',                             
  },
  result: {
    width: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 200,
    backgroundColor: '#ededed',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
  },
  resultValue: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold"
  }
});