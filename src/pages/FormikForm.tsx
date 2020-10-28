import React from 'react'
import { useFormik } from 'formik'
import Form from '../containers/Form'
import FormSchema from './formSchema'

const FormikForm = () => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      CPF: '',
      CPF2: '',
      birthday: undefined,
      checked: false,
      favoriteFood: 'Macarrão',
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values))
    },
  })

  return (
    <Form
      formData={values}
      onChangeField={setFieldValue}
      onSubmit={handleSubmit}
    />
  )
}

export default FormikForm
