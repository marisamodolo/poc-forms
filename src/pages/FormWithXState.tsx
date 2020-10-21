import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { assign, Machine } from 'xstate';
import { useMachine } from '@xstate/react'
import { Picker } from '@react-native-community/picker';
import { CheckBox } from "native-base"

const initialContext = {
  name: '',
  CPF: '',
  birthday: '',
  checked: false,
  favoriteFood: 'macarrão',
}

const formMachine = Machine({
  initial: 'idle',
  context: initialContext,
  states: {
    idle: {
      entry: "log",
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
      typing: assign((context, {name, value}) => ({...context, [name]: value})),
      log: (context, event) => console.log(context),
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

  const handleChange = ({ name, value }:IHandleChange) => send("typing", { name, value })

  return (
    <View>
      <Text style={styles.text}>Nome </Text>
      <TextInput
        value={current.context.name}
        style={styles.inputText}
        onChangeText={text => handleChange({ name: "name", value: text})}
      />
      <Text style={styles.text}>CPF </Text>
      <TextInput
        value={current.context.CPF}
        style={styles.inputText}
        onChangeText={text => handleChange({ name: "CPF", value: text})}
      />
      <Text style={styles.text}>Comida favorita </Text>
      <Picker
        selectedValue={current.context.favoriteFood}
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
          checked={current.context.checked}
          color={current.context.checked ? "#fc5185" : "#000030" }
          onPress={() => handleChange({ name: "checked", value: !current.context.checked})}
        />
        <Text style={{...styles.checkBoxText, color: current.context.checked ? "#fc5185" : "#000030" }}>
          MARCA AQUI!!
        </Text>
      </View>
      <Button color="#841584" title="Enviar" onPress={() => {
        send("stoppedTyping")
        send("submit")
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    marginVertical: 20,
    backgroundColor: "#F0EBE9",
    paddingVertical: 5,
    borderRadius: 50,
  },
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
  dropdown: {
    width: 300,
    height: 200,
    marginTop: -40,
  },
  checkBoxText: {
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 20,
  }
});

export default FormWithXState