import React, { useState } from 'react'
import Form from '../containers/Form'
import FormSchema from './formSchema'

const VanillaForm = () => {
  const [formData, setFormData] = useState({
    checked: false,
    // name: '',
    // password: '',
    // passwordConfirmation: '',
    // CPF: '',
    // birthday: '',
    // food: '',
  })
  const [errors, setErrors] = useState({})

  async function onSubmit() {
    await FormSchema.validate(formData, { abortEarly: false })
    .catch(({inner})=> {
      const result = {}
      inner.forEach(({ path, message }) => result[path] = message)
      setErrors(result)
    })
  }

  return (
    <Form
      formData={formData}
      errors={errors}
      onChangeField={(fieldName, value) => setFormData({...formData, [fieldName]: value}) }
      onSubmit={onSubmit}
    />
  )
}

export default VanillaForm
