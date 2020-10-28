import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, TextInput, View, Picker } from 'react-native'
import { CheckBox, DatePicker } from 'native-base'
import * as Yup from 'yup'
import MaskedTextField from '../components/MaskedTextField'
// import TextInputMask from 'react-native-text-input-mask'

const CPFInput = ({ onChangeText }: MaskedTextField) => (
  <MaskedTextField
    keyboardType='numeric'
    mask='000.000.000-00'
    maxLength={14}
    onChangeText={onChangeText}
  />
)

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muito curto!')
    .max(50, 'Muito longo!')
    .required('É necessário informar o nome.'),
  CPF: Yup.string()
    .min(13, 'CPF incorreto.')
    .required('É necessário informar o CPF.'),
  birthday: Yup.date().required('É necessário informar.'),
  checked: Yup.boolean().oneOf([true], 'É necessário marcar.'),
  password: Yup.string()
    .min(8, 'Senha muito pequena')
    .required('É necessário ter uma senha'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Confirmação de senha incorreta'
  ),
})

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
        marginTop: 10,
        width: '100%',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 20,
      }}
    >
      <Text
        style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          marginBottom: 10,
          paddingBottom: 10,
        }}
      >
        Vanilla Form
      </Text>
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
