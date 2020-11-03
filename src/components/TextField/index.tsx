import React, { useRef } from 'react'
import { View, Text, TextInputProps } from 'react-native'
import styles from './styles'
import TextInputMask from 'react-native-text-input-mask'

type TextFieldProps = TextInputProps & {
  label: string
  mask?: string
  placeholder?: string
  error?: string
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  onChangeText,
  error,
  ...props
}) => {
  const ref = useRef(null)

  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInputMask
        style={styles.inputText}
        refInput={ref}
        onChangeText={(formatted: string, raw: string) => {
          if (onChangeText) onChangeText(raw || formatted)
        }}
        {...props}
      />
      {error && (
        <Text>{error}</Text>
      )}
    </View>
  )
}

export default TextField
