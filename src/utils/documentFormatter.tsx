const removeNonDigits = (value: string) => value.replace(/\D+/g, '')

function returnParsedDocument (document: string | number) {
  return typeof document !== 'string'
    ? removeNonDigits(String(document))
    : removeNonDigits(document)
}

function formatCNPJ (number = '') {
  const document = returnParsedDocument(number)

  return document.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  )
}

function formatCPF (number = '') {
  const document = returnParsedDocument(number)

  return document.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  )
}

function documentToString (number = '') {
  const document = returnParsedDocument(number)

  const length = document
    ? document.length
    : 0

  if (length > 11) {
    return formatCNPJ(document)
  }

  if (length > 0) {
    return formatCPF(document)
  }

  return document
}

export {
  documentToString,
  removeNonDigits
}