import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMachine, interpret } from 'xstate';

export default function defaultForm() {
  const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'inactive',
    states: {
      inactive: { on: { TOGGLE: 'active' } },
      active: { on: { TOGGLE: 'inactive' } }
    }
  });

  // Machine instance with internal state
  const toggleService = interpret(toggleMachine)
    .onTransition((state) => console.log(state.value))
    .start();
  // => 'inactive'

  toggleService.send('TOGGLE');
  // => 'active'

  toggleService.send('TOGGLE');
  // => 'inactive'

  return (
      <Text>Open up App.tsx to start working on your app!</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
