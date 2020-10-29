import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { Container, Tab, Tabs } from 'native-base'

import XStateForm from './src/pages/XStateForm'
import VanillaForm from './src/pages/VanillaForm'
import FormikForm from './src/pages/FormikForm'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Tabs>
          <Tab heading='Vanilla'>
            <ScrollView>
              <VanillaForm />
            </ScrollView>
          </Tab>
          <Tab heading='Formik'>
            <ScrollView>
              <FormikForm />
            </ScrollView>
          </Tab>
          <Tab heading='XState'>
            <ScrollView>
              <XStateForm />
            </ScrollView>
          </Tab>
        </Tabs>
      </Container>
    </SafeAreaView>
  )
}
