import * as Yup from 'yup'

export default async (schema: Yup.ObjectSchema, data: object) => {
  const result = {}
  await schema.validate(data, { abortEarly: false }).catch(({ inner }) => {
    inner.forEach(({ path, message }) => (result[path] = message))
  })
  return result
}
