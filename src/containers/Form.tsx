import React, { FormEvent, ReactText, useRef } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-community/picker'
import CheckBox from '@react-native-community/checkbox'
import styles from './styles'
import TextField from '../components/TextField'

type Form = {
  formData: {
    name?: string
    CPF?: string
    favoriteFood?: string
    checked: boolean
    password?: string
    passwordConfirmation?: string
  }
  errors: {
    [key: string]: string[]
  }
  onChangeField: (fieldType: string, value: string) => void
  onSubmit: (values: FormEvent<HTMLFormElement>) => void
}

const Form = ({ formData, onChangeField, onSubmit, errors }: Form) => {
  return (
    <View style={styles.pageContainer}>
      <TextField
        label='Nome'
        onChangeText={(value) => onChangeField('name', value)}
        placeholder='Seu nome completo'
        error={errors.name}
      />
      <TextField
        keyboardType='numeric'
        label='CPF'
        mask='[000].[000].[000]-[00]'
        onChangeText={(extracted) => {
          onChangeField('CPF', extracted)
        }}
        placeholder='000.000.000-00'
        error={errors.CPF}
      />
      <Text style={styles.text}>Comida favorita </Text>
      <Picker
        selectedValue={formData.favoriteFood}
        style={styles.dropdown}
        onValueChange={(value) => onChangeField('favoriteFood', value)}
      >
        <Picker.Item label='Selecione sua comida favorita' value='' />
        <Picker.Item label='Macarrão' value='Macarrão' />
        <Picker.Item label='Lasanha' value='Lasanha' />
        <Picker.Item label='Pizza' value='Pizza' />
      </Picker>
      <View style={styles.container}>
        <CheckBox
          value={formData.checked}
          onValueChange={() => onChangeField('checked', !formData.checked)}
        />
        <Text
          style={{
            ...styles.checkBoxText,
            color: formData.checked ? '#fc5185' : '#000030',
          }}
        >
          MARCA AQUI!!
        </Text>
      </View>
      {errors.checked && <Text>{errors.checked} </Text>}
      <TextField
        label='Senha:'
        placeholder='Digite aqui sua senha'
        onChangeText={(password) => onChangeField('password', password)}
        autoCompleteType='password'
        secureTextEntry
        error={errors.password}
      />
      <TextField
        label='Confirme sua senha'
        placeholder='Digite sua senha novamente'
        onChangeText={(password) =>
          onChangeField('passwordConfirmation', password)
        }
        autoCompleteType='password'
        secureTextEntry
        error={errors.passwordConfirmation}
      />
      <Button color='#841584' title='Enviar' onPress={onSubmit} />
      <Text style={styles.text}>FormData</Text>
      <View style={styles.formData}>
        <Text>name: {formData.name}</Text>
        <Text>CPF: {formData.CPF}</Text>
        <Text>birthday: {JSON.stringify(formData.birthday)}</Text>
        <Text>checked: {String(formData.checked)}</Text>
        <Text>favoriteFood: {formData.favoriteFood}</Text>
        <Text>password: {formData.password}</Text>
        <Text>passwordConfirmation: {formData.passwordConfirmation}</Text>
      </View>
    </View>
  )
}

export default Form
