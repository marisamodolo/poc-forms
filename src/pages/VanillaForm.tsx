import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'

import { Picker } from '@react-native-community/picker'

import MaskedTextField from '../components/MaskedTextField'

/**
 *
 * √ Nome
 * √ CPF
 * √ Ano de nascimento (seletor)
 * x Algum tipo de pergunta com checkbox
 * x Algum tipo de pergunta com radio group
 * x Uma textarea
 * √ Um campo de password
 * √ Um campo de confirm password
 */

// import TextInputMask from 'react-native-text-input-mask'

const CPFInput = ({ onChangeText }: MaskedTextField) => (
  <MaskedTextField onChangeText={onChangeText} mask='000.000.000-00' />
)

const VanillaForm = () => {
  const [formData, setFormData] = useState({})

  function onSubmit() {
    console.log('submitted!')
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          padding: 12,
          borderRightColor: '#ccc',
          borderRightWidth: 1,
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
        {/* <Text>Nome:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder='Digite aqui seu nome'
          onChangeText={(text) => setName(text)}
          defaultValue={name}
          autoCompleteType='username'
        /> */}
        <Text>CPaaaF:</Text>
        <CPFInput
          onChangeText={(raw) => setFormData({ ...formData, CPF: raw })}
        />
        {/* <Picker
          selectedValue={ageGroup}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setAgeGroup(itemValue)}
        >
          <Picker.Item label='Sua idade' value='' />
          <Picker.Item label='13-19' value='teen' />
          <Picker.Item label='20-40' value='young_adult' />
          <Picker.Item label='41-60' value='adult' />
          <Picker.Item label='61+' value='senior' />
        </Picker>
        <Text>Senha:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder='Digite aqui sua senha'
          onChangeText={(text) => setPassword(text)}
          defaultValue={password}
          autoCompleteType='password'
          secureTextEntry
        />
        <Text>Confirme sua senha:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder='Digite aqui sua senha'
          onChangeText={(text) => setPasswordConfirmation(text)}
          defaultValue={passwordConfirmation}
          autoCompleteType='password'
          secureTextEntry
        /> */}
        <Button onPress={onSubmit} title='Enviar' color='#841584' />
        <Text>Form data onSubmit:</Text>
        <Text>{JSON.stringify(formData)}</Text>
      </View>
    </View>
  )
}

export default VanillaForm
