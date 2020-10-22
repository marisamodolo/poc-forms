import React, { useState } from 'react'
import { TextInput } from 'react-native'
import StringMask from 'string-mask'

const unmask = (text: string) => text.replace(/\./g, '').replace('-', '')

type MaskedTextField = {
  mask: string
  unmask: (formatted: string) => string
  onChangeText: (raw: string, formatted: string) => void
}

const MaskedTextField = ({ onChangeText, mask, unmask }: MaskedTextField) => {
  const [formatter] = useState(new StringMask(mask))
  const [value, setValue] = useState('')

  function setValueWithMask(text: string) {
    if (text.length > mask.length) return
    const newValue = unmask(text)
    setValue(newValue)
    onChangeText(newValue, formatter.apply(newValue))
  }

  return (
    <TextInput
      placeholder={mask}
      value={formatter.apply(value)}
      onChangeText={setValueWithMask}
      onKeyPress={(e) => {
        if (e.key === 'Backspace') {
          setValueWithMask(value.slice(0, -1))
          e.preventDefault()
        }
      }}
    />
  )
}

MaskedTextField.defaultProps = {
  unmask,
}

export default MaskedTextField
