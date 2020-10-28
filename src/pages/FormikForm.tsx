import React from 'react'
import { Text, View, Button } from 'react-native'
import InputText from '../components/InputText'
import { Picker } from '@react-native-community/picker'
import { CheckBox, DatePicker } from 'native-base'
import { useFormik } from 'formik'

import styles from './styles'
import FormSchema from './formSchema'

const FormikForm = () => {
  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      CPF: '',
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
    <View style={styles.pageContainer}>
      <View>
        <InputText
          name='name'
          label='Nome'
          handleChange={setFieldValue}
          error={errors.name}
          touched={touched.name}
        />
        <InputText
          name='CPF'
          label='CPF'
          a
          handleChange={setFieldValue}
          error={errors.CPF}
          touched={touched.CPF}
          mask
        />
        <Text style={styles.text}>Data de nascimento </Text>
        <View style={styles.dateContainer}>
          <DatePicker
            defaultDate={values.birthday}
            locale={'pt-br'}
            animationType={'fade'}
            placeHolderText='Selecione a data'
            textStyle={{ color: '#000030' }}
            placeHolderTextStyle={{ color: '#d3d3d3' }}
            onDateChange={(value) => setFieldValue('birthday', value)}
          />
          {errors.birthday && (
            <Text style={styles.error}>{errors.birthday}</Text>
          )}
        </View>
        <Text style={styles.text}>Comida favorita </Text>
        <Picker
          selectedValue={values.favoriteFood}
          style={styles.dropdown}
          onValueChange={handleChange('favoriteFood')}
        >
          <Picker.Item label='Macarrão' value='Macarrão' />
          <Picker.Item label='Lasanha' value='Lasanha' />
          <Picker.Item label='Pizza' value='Pizza' />
        </Picker>
        <View style={styles.container}>
          <CheckBox
            checked={values.checked}
            color={values.checked ? '#841584' : '#000030'}
            onPress={() => setFieldValue('checked', !values.checked)}
          />
          <Text
            style={{
              ...styles.checkBoxText,
              color: values.checked ? '#841584' : '#000030',
            }}
          >
            MARCA AQUI!!
          </Text>
        </View>
        {errors.checked && touched.checked && (
          <Text style={styles.error}>{errors.checked}</Text>
        )}
        <Button color='#841584' title='Enviar' onPress={handleSubmit} />
      </View>
      <Text style={styles.text}> FormData </Text>
      <View style={styles.formData}>
        <Text> name: {values.name} </Text>
        <Text> CPF: {values.CPF} </Text>
        <Text> birthday: {values.birthday && values.birthday.toString()} </Text>
        <Text> checked: {values.checked.toString()} </Text>
        <Text> favoriteFood: {values.favoriteFood} </Text>
      </View>
    </View>
  )
}

export default FormikForm
