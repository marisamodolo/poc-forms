import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { documentToString, removeNonDigits } from '../../utils/documentFormatter'


const InputText = ({ name, label, handleChange} : { name: string, label: string, handleChange: void }) => {
  const [formattedValue, setFormattedValue] = useState('')

  const onChange = ({ name, value}: { name: string, value: string }) => {
    const formatedDocument = documentToString(value)
    const rawDocument = removeNonDigits(value)
    setFormattedValue(formatedDocument)
    handleChange(name, rawDocument)
  }

  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={formattedValue}
        style={styles.inputText}
        onChangeText={value => onChange({ name, value })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputText: {
    height: 40,
    width: 300,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  text: {
    marginTop: 20,
    fontWeight: "bold",
    color: "#841584",
  },
})

export default InputText