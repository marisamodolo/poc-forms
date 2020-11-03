import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    padding: 20,
  },
  dateContainer: {
    marginLeft: -10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
    backgroundColor: '#F0EBE9',
    paddingVertical: 5,
    borderRadius: 50,
  },
  inputText: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  text: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#841584',
  },
  dropdown: {
    width: 300,
    height: 200,
    marginTop: -40,
  },
  checkBoxText: {
    fontWeight: 'bold',
    marginTop: 2,
    marginLeft: 20,
  },
  formData: {
    borderColor: '#000030',
    borderWidth: 1,
  },
  error: {
    color: '#991914',
    fontWeight: 'bold',
    marginLeft: 10,
  },
})

export default styles
