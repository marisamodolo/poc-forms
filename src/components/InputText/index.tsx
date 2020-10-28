import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { documentToString, removeNonDigits } from '../../utils/documentFormatter'


const InputText = (
  { name, label, handleChange, error, touched, mask }
  :
  { name: string, label: string, handleChange: void, error: string | undefined, touched: boolean | undefined, mask: boolean }
) => {
  const [formattedValue, setFormattedValue] = useState('')

  const onChange = ({ name, value}: { name: string, value: string }) => {
    if(mask) {
      const formatedDocument = documentToString(value)
      const rawDocument = removeNonDigits(value)
      setFormattedValue(formatedDocument)
      return handleChange(name, rawDocument)
    }
    setFormattedValue(value)
    handleChange(name, value)
  }

  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={formattedValue}
        style={styles.inputText}
        onChangeText={value => onChange({ name, value })}
      />
      {error && touched && (
        <Text style={styles.error}>{error}</Text>
      )}
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
  error: {
    color: "#991914",
    fontWeight: "bold",
    marginTop: 3,
  }
})

export default InputText