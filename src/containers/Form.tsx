import React, { FormEvent, ReactText, useRef } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { CheckBox, DatePicker } from 'native-base'
import MaskedTextField from '../components/MaskedTextField'
import TextInputMask from 'react-native-text-input-mask'
import styles from './styles'

type Form = {
  formData: {
    name: string
    birthday: ReactText
    CPF: string
    CPF2: string
    favoriteFood: string
    checked: boolean
    password: string
    passwordConfirmation: string
  }
  onChangeField: (fieldType: string, value: string) => void
  onSubmit: (values: FormEvent<HTMLFormElement>) => void
}

const unmask = (value: string) => value.replace(/\D+/g, '')

const Form = ({ formData, onChangeField, onSubmit }: Form) => {
  const ref = useRef()

  return (
    <View style={styles.pageContainer}>
      <MaskedTextField
        label='Nome'
        placeholder='Seu nome completo'
        onChangeText={(value) => onChangeField('name', value)}
        // error={errors.name}
        // touched={touched.name}
      />
      <MaskedTextField
        label='CPF Vanilla Mask'
        mask='000.000.000-00'
        onChangeText={(value) => onChangeField('CPF', value)}
        unmask={unmask}
        keyboardType='numeric'
        maxLength={11}
        // error={errors.CPF}
        // touched={touched.CPF}
      />
      <Text style={styles.text}>CPF Native Mask</Text>
      <TextInputMask
        style={styles.inputText}
        refInput={ref}
        onChangeText={(_: string, extracted: string) => {
          onChangeField('CPF2', extracted)
        }}
        placeholder='000.000.000-00'
        mask='[000].[000].[000]-[00]'
      />
      <Text style={styles.text}>Comida favorita </Text>
      <Picker
        selectedValue={formData.favoriteFood}
        style={styles.dropdown}
        onValueChange={(value) => onChangeField('favoriteFood', value)}
      >
        <Picker.Item label='Macarrão' value='Macarrão' />
        <Picker.Item label='Lasanha' value='Lasanha' />
        <Picker.Item label='Pizza' value='Pizza' />
      </Picker>
      <DatePicker
        locale={'pt-br'}
        animationType={'fade'}
        placeHolderText='Selecione a data'
        textStyle={{ color: '#000030' }}
        placeHolderTextStyle={{ color: '#d3d3d3' }}
        onDateChange={(value) => onChangeField('birthday', value)}
      />
      <View style={styles.container}>
        <CheckBox
          checked={formData.checked}
          color={formData.checked ? '#fc5185' : '#000030'}
          onPress={() => onChangeField('checked', !formData.checked)}
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
      <Text>Senha:</Text>
      <TextInput
        placeholder='Digite aqui sua senha'
        onChangeText={(password) => onChangeField('password', password)}
        autoCompleteType='password'
        secureTextEntry
      />
      <Text>Confirme sua senha:</Text>
      <TextInput
        placeholder='Digite sua senha novamente'
        onChangeText={(password) =>
          onChangeField('passwordConfirmation', password)
        }
        autoCompleteType='password'
        secureTextEntry
      />
      <Button color='#841584' title='Enviar' onPress={onSubmit} />
      <Text style={styles.text}>FormData</Text>
      <View style={styles.formData}>
        <Text>name: {formData.name}</Text>
        <Text>CPF: {formData.CPF}</Text>
        <Text>CPF: {formData.CPF2}</Text>
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
