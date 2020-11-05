import React, { useState } from 'react'
import Form from '../containers/Form'
import schema from './formSchema'
import validate from '../utils/validateSchema'

const VanillaForm = () => {
  const [formData, setFormData] = useState({ checked: false })
  const [errors, setErrors] = useState({})

  async function onSubmit() {
    const result = await validate(schema, formData)
    setErrors(result)
  }

  return (
    <Form
      formData={formData}
      errors={errors}
      onChangeField={(fieldName, value) =>
        setFormData({ ...formData, [fieldName]: value })
      }
      onSubmit={onSubmit}
    />
  )
}

export default VanillaForm
