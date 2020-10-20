import React, { useEffect, useState } from 'react'
import { Picker, Button, Text, TextInput, View } from 'react-native'

import TextInputMask from 'react-native-text-input-mask'

import useCPF from '../hooks/useCPF'
import useField from '../hooks/useField'

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

const VanillaForm = () => {
  const [name, setName] = useState('')
  const inputref = useRef()
  const [ageGroup, setAgeGroup] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [formData, setFormData] = useState({})
  const [status, setStatus] = useState('pristine')
  const [CPF, setCPF, placeholderCPF, isValidCPF] = useCPF()
  const [test, setTest, isTestValid] = useField(
    '000.000-0',
    '0000000',
    (value: String) => value === '1111111'
  )

  useEffect(() => {
    const isValid =
      name !== '' &&
      name.length > 2 &&
      isValidCPF &&
      password !== '' &&
      password.length > 8 &&
      password === passwordConfirmation
    setStatus(isValid ? 'valid' : 'invalid')
    console.log(isTestValid)
  }, [name, password, passwordConfirmation, CPF, test])

  function onSubmit() {
    setFormData({
      ageGroup,
      name,
      CPF,
      password,
      passwordConfirmation,
    })
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
        <Text>Test:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder='test'
          onChangeText={setTest}
          onKeyPress={({ key }) => console.log(key)}
          value={test}
          autoCompleteType='username'
        />
        <Text>Nome:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder='Digite aqui seu nome'
          onChangeText={(text) => setName(text)}
          defaultValue={name}
          autoCompleteType='username'
        />
        <Text>CPF:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder={placeholderCPF}
          value={CPF}
          onChangeText={setCPF}
        />
        <TextInputMask
          refInput={inputref}
          onChangeText={(formatted, extracted) => {
            console.log(formatted) // +1 (123) 456-78-90
            console.log(extracted) // 1234567890
          }}
          mask={'+1 ([000]) [000] [00] [00]'}
        />
        <Picker
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
        />
        <Button onPress={onSubmit} title='Enviar' color='#841584' />
      </View>
      <View
        style={{
          padding: 12,
        }}
      >
        <Text>Form data onSubmit:</Text>
        <Text>{JSON.stringify(formData).replaceAll(',', ',\n')}</Text>
        <Text>Form status: {status}</Text>
      </View>
    </View>
  )
}

export default VanillaForm
