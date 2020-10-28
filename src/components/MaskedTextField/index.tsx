import React, { useState } from 'react'
import { TextInput } from 'react-native'
import StringMask from 'string-mask'

const unmask = (value: string) => value.replace(/\D+/g, '')

type MaskedTextField = TextInput & {
  mask: string
  unmask: (formatted: string) => string
  onChangeText: (raw: string, formatted: string) => void
}

const MaskedTextField = ({
  onChangeText,
  mask,
  unmask,
  ...props
}: MaskedTextField) => {
  const [formatter] = useState(new StringMask(mask))
  const [value, setValue] = useState('')

  function unmaskValue() {
    setValue(unmask(value))
  }

  function maskValue() {
    setValue(formatter.apply(value))
  }

  function handleChange(text: string) {
    setValue(text)
    onChangeText(value, formatter.apply(value))
  }

  return (
    <TextInput
      placeholder={mask}
      value={value}
      onFocus={unmaskValue}
      onBlur={maskValue}
      onChangeText={handleChange}
      {...props}
      // Would need to limit maxLength depending on state: editing (11) vs idle (14)
    />
  )
}

MaskedTextField.defaultProps = {
  unmask,
}

export default MaskedTextField
