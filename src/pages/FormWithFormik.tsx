import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import InputText from '../components/InputText'
import { Picker } from '@react-native-community/picker';
import { CheckBox, DatePicker } from "native-base"
import { useFormik } from 'formik';

const FormWithXState = () => {
  const { handleChange, handleSubmit, values, setFieldValue} = useFormik({
    initialValues: {
      name: '',
      CPF: '',
      birthday: new Date(),
      checked: false,
      favoriteFood: 'Macarrão',
    },
    onSubmit: values => {
      console.log(values)
    },
  });

  return (
    <View style={{ width: 300 }}>
      <View>
        <Text style={styles.text}>Nome </Text>
        <TextInput
          style={styles.inputText}
          onChangeText={handleChange('name')}
        />
        <InputText name="CPF" label="CPF" handleChange={setFieldValue}/>
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
        <Button color="#841584" title="Enviar" onPress={handleSubmit} />
      </View>
      <Text style={styles.text}> FormData </Text>
      <View style={styles.formData}>
        <Text> name: {values.name} </Text>
        <Text> CPF: {values.CPF} </Text>
        <Text> birthday: {values.birthday.toString()} </Text>
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
  }
});

export default FormWithXState