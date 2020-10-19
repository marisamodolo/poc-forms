import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, Button } from 'react-native';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react'
import CheckBox from "@react-native-community/checkbox";

const formMachine = createMachine({
  initial: 'idle',
  context: {
    name: '',
    CPF: '',
    birthday: '',
    checked: false,
    favoriteBand: '',
  },
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
          target: "idle",
          actions: "log"
        }
      }
    },
  },
},
{
  actions: {
    typing: assign((context, event) => {
      console.log("evento", event)
      return ({...context, inputValue: event.value})
    }),
    log: (context, e) => console.log(context.inputValue),
  }
},
)

interface IHandleChange {
  name: string
  value: string
}

const FormWithXState = () => {
  const [current, send] = useMachine(formMachine)

  useEffect(() => {
    current
  }, [current])

  const handleChange = ({ name, value }:IHandleChange) => send("typing", { [name]: value })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        onChangeText={text => handleChange({ name: "name", value: text})}
      />
      <TextInput
        style={styles.inputText}
        onChangeText={text => handleChange({ name: "CPF", value: text})}
      />
      <CheckBox
        onValueChange={value => handleChange({ name: "checked", value: value})}
      />
      <Button color="#841584" title="Submit" onPress={() => {
        send("submit")
        send("stoppedTyping")
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  inputText: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default FormWithXState