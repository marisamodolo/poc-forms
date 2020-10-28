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
  birthday: Yup.date().required('É necessário informar.'),
  checked: Yup.boolean().oneOf([true], 'É necessário marcar.'),
  password: Yup.string()
    .min(8, 'Senha muito pequena')
    .required('É necessário ter uma senha'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), undefined],
    'Confirmação de senha incorreta'
  ),
})

export default FormSchema
