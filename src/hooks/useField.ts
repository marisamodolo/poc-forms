import { useMemo, useState } from 'react'
import StringMask from 'string-mask'

type Formatter = {
  apply: Function
}

const useField = (mask = '.*', unmask = '.*', validate: Function) => {
  const [value, setValue] = useState('')
  const formatter: Formatter = new StringMask(mask)
  const unformatter: Formatter = new StringMask(unmask)

  function setValueWithMask(text: String) {
    setValue(unformatter.apply(text))
  }

  console.log(formatter.apply(value), unformatter.apply(value))
  return [
    formatter.apply(value),
    setValueWithMask,
    validate ? validate(value) : true,
  ]
}

export default useField
