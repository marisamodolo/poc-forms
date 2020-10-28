import React, { useState } from 'react'
import Form from '../containers/Form'
import FormSchema from './formSchema'

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
    <Form
      formData={formData}
      onChangeField={(fieldName, value) => setFormData({...formData, [fieldName]: value}) }
      onSubmit={onSubmit}
    />
  )
}

export default VanillaForm
