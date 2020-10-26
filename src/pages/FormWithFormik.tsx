import React, { FormEvent } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import InputText from '../components/InputText'
import { Picker } from '@react-native-community/picker';
import { CheckBox, DatePicker } from "native-base"
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muito curto!')
    .max(50, 'Muito longo!')
    .required('É necessário informar o nome.'),
  CPF: Yup.string()
    .min(11, 'CPF incorreto.')
    .max(11, 'CPF incorreto.')
    .matches(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2})$/, 'CPF inválido.')
    .required('É necessário informar o CPF.'),
  birthday: Yup.date().required('É necessário informar.'),
  checked: Yup.boolean().oneOf([true], 'É necessário marcar.'),
});

const FormWithFormik = () => {
  const { errors, touched, handleChange, handleSubmit, values, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      CPF: '',
      birthday: undefined,
      checked: false,
      favoriteFood: 'Macarrão',
    },
    validationSchema: FormSchema,
    onSubmit: values => {
      alert(JSON.stringify(values))
    },
  });

  return (
    <View style={{ width: 300 }}>
      <View>
        <InputText
          name="name"
          label="Nome"
          handleChange={setFieldValue}
          error={errors.name}
          touched={touched.name}
        />
        <InputText
          name="CPF"
          label="CPF"a
          handleChange={setFieldValue}
          error={errors.CPF}
          touched={touched.CPF}
          mask
        />
        <Text style={styles.text}>Data de nascimento </Text>
        <View style={styles.dateContainer}>
          <DatePicker
            defaultDate={values.birthday}
            locale={"pt-br"}
            animationType={"fade"}
            placeHolderText="Selecione a data"
            textStyle={{ color: "#000030" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
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
          <Picker.Item label="Macarrão" value="Macarrão" />
          <Picker.Item label="Lasanha" value="Lasanha" />
          <Picker.Item label="Pizza" value="Pizza" />
        </Picker>
        <View style={styles.container}>
          <CheckBox
            checked={values.checked}
            color={values.checked ? "#841584" : "#000030"}
            onPress={() => setFieldValue("checked", !values.checked)}
          />
          <Text style={{...styles.checkBoxText, color: values.checked ? "#841584" : "#000030" }}>
            MARCA AQUI!!
          </Text>
        </View>
        {errors.checked && touched.checked && (
          <Text style={styles.error}>{errors.checked}</Text>
        )}
        <Button color="#841584" title="Enviar" onPress={handleSubmit} />
      </View>
      <Text style={styles.text}> FormData </Text>
      <View style={styles.formData}>
        <Text> name: {values.name} </Text>
        <Text> CPF: {values.CPF} </Text>
        <Text> birthday: {values.birthday && ( values.birthday.toString()) } </Text>
        <Text> checked: {values.checked.toString()} </Text>
        <Text> favoriteFood: {values.favoriteFood} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    marginLeft: -10,
  },
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
  },
  formData: {
    borderColor: "#000030",
    borderWidth: 1,
  },
  error: {
    color: "#991914",
    fontWeight: "bold",
    marginLeft: 10
  }
});

export default FormWithFormik