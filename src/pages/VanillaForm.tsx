import React, { useState } from 'react'
import { Button, Text, TextInput, View, Picker } from 'react-native'
import { CheckBox, DatePicker } from 'native-base'
import MaskedTextField from '../components/MaskedTextField'
// import TextInputMask from 'react-native-text-input-mask'

import FormSchema from './formSchema'

const CPFInput = ({ onChangeText }: MaskedTextField) => (
  <MaskedTextField
    keyboardType='numeric'
    mask='000.000.000-00'
    maxLength={14}
    onChangeText={onChangeText}
  />
)

const VanillaForm = () => {
  const [formData, setFormData] = useState({
    checked: false,
    name: '',
    password: '',
    passwordConfirmation: '',
    CPF: '',
    birthday: '',
    food: '',
  })

  function onSubmit() {
    FormSchema.isValid(formData).then((valid) => {
      console.log('submitted! Form is valid: ', valid)
    })
  }

  return (
    <View
      style={{
        width: '100%',
        padding: 20,
      }}
    >
      <Text>Nome:</Text>
      <TextInput
        placeholder='Digite aqui seu nome'
        onChangeText={(name) => setFormData({ ...formData, name })}
        autoCompleteType='username'
      />
      <Text>CPF:</Text>
      <CPFInput onChangeText={(CPF) => setFormData({ ...formData, CPF })} />
      <DatePicker
        locale={'pt-br'}
        animationType={'fade'}
        placeHolderText='Selecione a data'
        textStyle={{ color: '#000030' }}
        placeHolderTextStyle={{ color: '#d3d3d3' }}
        onDateChange={(birthday) => setFormData({ ...formData, birthday })}
      />
      <Text>Comida favorita </Text>
      <Picker
        selectedValue={formData.food}
        onValueChange={(food) => setFormData({ ...formData, food })}
      >
        <Picker.Item label='Selecione uma comida' value='' />
        <Picker.Item label='Macarrão' value='Macarrão' />
        <Picker.Item label='Lasanha' value='Lasanha' />
        <Picker.Item label='Pizza' value='Pizza' />
      </Picker>
      <View>
        <CheckBox
          checked={formData.checked}
          color={formData.checked ? '#841584' : '#000030'}
          onPress={() =>
            setFormData({ ...formData, checked: !formData.checked })
          }
        />
        <Text style={{ color: formData.checked ? '#841584' : '#000030' }}>
          Concordo com os termos do acordo.
        </Text>
      </View>
      <Text>Senha:</Text>
      <TextInput
        placeholder='Digite aqui sua senha'
        onChangeText={(password) => setFormData({ ...formData, password })}
        autoCompleteType='password'
        secureTextEntry
      />
      <Text>Confirme sua senha:</Text>
      <TextInput
        placeholder='Digite sua senha novamente'
        onChangeText={(passwordConfirmation) =>
          setFormData({ ...formData, passwordConfirmation })
        }
        autoCompleteType='password'
        secureTextEntry
      />
      <Button onPress={onSubmit} title='Enviar' color='#841584' />
      <Text>Form data onSubmit:</Text>
      <Text>{JSON.stringify(formData)}</Text>
    </View>
  )
}

export default VanillaForm
