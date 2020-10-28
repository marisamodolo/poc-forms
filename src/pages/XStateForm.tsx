import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { assign, Machine } from 'xstate';
import { useMachine } from '@xstate/react'
import { Picker } from '@react-native-community/picker';
import { CheckBox } from "native-base"
import styles from './styles'
const initialContext = {
  name: '',
  CPF: '',
  birthday: '',
  checked: false,
  favoriteFood: 'Macarrão',
}

const formMachine = Machine({
  initial: 'idle',
  context: initialContext,
  states: {
    idle: {
      on: {
        typing: {
          actions: "typing",
        },
        submit: "submitting",
      }
    },
    submitting: {
      on: {
        stoppedTyping: {
          actions: "log",
        },
        submit: {
          target: "idle",
          actions: "clear",
        }
      },
    },
  },
  },
  {
    actions: {
      typing: assign((context, { name, value }) => ({...context, [name]: value})),
      log: (context, event) => alert(JSON.stringify(context)),
      clear: assign(() => initialContext)
    }
  },
)

interface IHandleChange {
  name: string
  value: string | boolean | number
}

const FormWithXState = () => {
  const [current, send] = useMachine(formMachine)

  const { context } = current

  const handleChange = ({ name, value }:IHandleChange) => send("typing", { name, value })

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.text}>Nome </Text>
      <TextInput
        value={context.name}
        style={styles.inputText}
        onChangeText={text => handleChange({ name: "name", value: text})}
      />
      <Text style={styles.text}>CPF </Text>
      <TextInput
        value={context.CPF}
        style={styles.inputText}
        onChangeText={text => handleChange({ name: "CPF", value: text})}
      />
      <Text style={styles.text}>Comida favorita </Text>
      <Picker
        selectedValue={context.favoriteFood}
        style={styles.dropdown}
        onValueChange={(itemValue, itemIndex) =>
          handleChange({name: "favoriteFood", value: itemValue })
        }>
        <Picker.Item label="Macarrão" value="Macarrão" />
        <Picker.Item label="Lasanha" value="Lasanha" />
        <Picker.Item label="Pizza" value="Pizza" />
      </Picker>
      <View style={styles.container}>
        <CheckBox
          checked={context.checked}
          color={context.checked ? "#fc5185" : "#000030" }
          onPress={() => handleChange({ name: "checked", value: !context.checked})}
        />
        <Text style={{...styles.checkBoxText, color: context.checked ? "#fc5185" : "#000030" }}>
          MARCA AQUI!!
        </Text>
      </View>
      <Button color="#841584" title="Enviar" onPress={() => {
        send("stoppedTyping")
        send("submit")
      }} />
      <Text style={styles.text} >FormData</Text>
      <View style={styles.formData}>
        <Text>name: {context.name}</Text>
        <Text>CPF: {context.CPF}</Text>
        <Text>birthday: {context.birthday}</Text>
        <Text>checked: {context.checked}</Text>
        <Text>favoriteFood: {context.favoriteFood}</Text>
      </View>
    </View>
  );
}

export default FormWithXState