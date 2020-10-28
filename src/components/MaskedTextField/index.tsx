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
  maxLength,
  ...props
}: MaskedTextField) => {
  const [formatter] = useState(new StringMask(mask))
  const [value, setValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  function handleFocus() {
    setValue(unmask(value))
    setIsEditing(true)
  }

  function handleBlur() {
    setValue(formatter.apply(value))
    setIsEditing(false)
  }

  function handleChange(text: string) {
    setValue(text)
    onChangeText(value, formatter.apply(value))
  }

  return (
    <TextInput
      placeholder={mask}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={handleChange}
      maxLength={isEditing ? maxLength : null}
      {...props}
    />
  )
}

MaskedTextField.defaultProps = {
  unmask,
}

export default MaskedTextField
