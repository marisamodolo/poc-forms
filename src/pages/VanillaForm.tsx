import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

import useCPF from "./hooks/useCPF";

/**
 *
 * Nome
 * CPF
 * Ano de nascimento (seletor)
 * Algum tipo de pergunta com checkbox
 * Algum tipo de pergunta com radio group
 * Uma textarea
 * Um campo de password
 * Um campo de confirm password
 */

const VanillaForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState("pristine");
  const [CPF, setCPF, placeholderCPF, isValidCPF] = useCPF();

  useEffect(() => {
    const isValid =
      name !== "" &&
      name.length > 2 &&
      isValidCPF &&
      password !== "" &&
      password.length > 8 &&
      password === passwordConfirmation;
    setStatus(isValid ? "valid" : "invalid");

    console.log(
      name !== "",
      name.length > 2,
      isValidCPF,
      password !== "",
      password.length > 8,
      password === passwordConfirmation
    );
  }, [name, password, passwordConfirmation, CPF]);

  function onSubmit() {
    setFormData({
      name,
      CPF,
      password,
      passwordConfirmation,
    });
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginTop: 10,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          padding: 12,
          borderRightColor: "#ccc",
          borderRightWidth: 1,
        }}
      >
        <Text
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginBottom: 10,
            paddingBottom: 10,
          }}
        >
          Vanilla Form
        </Text>
        <Text>Nome:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder="Digite aqui seu nome"
          onChangeText={(text) => setName(text)}
          defaultValue={name}
          autoCompleteType="username"
        />
        <Text>CPF:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder={placeholderCPF}
          value={CPF}
          onChangeText={setCPF}
        />
        <Text>Senha:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder="Digite aqui sua senha"
          onChangeText={(text) => setPassword(text)}
          defaultValue={password}
          autoCompleteType="password"
          secureTextEntry
        />
        <Text>Confirme sua senha:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder="Digite aqui sua senha"
          onChangeText={(text) => setPasswordConfirmation(text)}
          defaultValue={passwordConfirmation}
          autoCompleteType="password"
          secureTextEntry
        />
        <Button onPress={onSubmit} title="Enviar" color="#841584" />
      </View>
      <View
        style={{
          padding: 12,
        }}
      >
        <Text>Form data onSubmit:</Text>
        <Text>{JSON.stringify(formData)}</Text>
        <Text>Form status: {status}</Text>
      </View>
    </View>
  );
};

export default VanillaForm;
