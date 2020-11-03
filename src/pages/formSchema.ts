import * as Yup from 'yup'

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muito curto!')
    .max(50, 'Muito longo!')
    .required('É necessário informar o nome.'),
  CPF: Yup.string()
    .min(11, 'CPF incorreto.')
    .matches(/[0-9]{11}/, 'CPF inválido.')
    .required('É necessário informar o CPF.'),
  checked: Yup.boolean()
  .oneOf([true], 'É necessário marcar.'),
  password: Yup.string()
    .min(8, 'Senha muito pequena')
    .matches(/[A-Za-z0-9_.]{11}/, 'Senha inválida.')
    .required('É necessário ter uma senha'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), undefined],
    'Confirmação de senha incorreta'
  )
  .required('É necessário confirmar a senha'),
})

export default FormSchema
