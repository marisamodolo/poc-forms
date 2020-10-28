import React from 'react'
import { Container, Tab, Tabs } from 'native-base'
import XStateForm from './src/pages/XStateForm'
import VanillaForm from './src/pages/VanillaForm'
import FormikForm from './src/pages/FormikForm'

export default function App() {
  return (
    <Container>
      <Tabs>
        <Tab heading='Vanilla'>
          <VanillaForm />
        </Tab>
        <Tab heading='Formik'>
          <FormikForm />
        </Tab>
        <Tab heading='XState'>
          <XStateForm />
        </Tab>
      </Tabs>
    </Container>
  )
}