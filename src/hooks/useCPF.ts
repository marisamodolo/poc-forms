import { useState } from "react";
import StringMask from "string-mask";

const cpfFormatter = new StringMask("000.000.000-00");

const useCPF = () => {
  const [CPF, setCPF] = useState("");

  function setDocumentWithMask(text: String) {
    setCPF(text.replace(/\./g, "").replace("-", ""));
  }

  return [
    cpfFormatter.apply(CPF),
    setDocumentWithMask,
    "000.000.000-00",
    CPF.length === 11,
  ];
};

export default useCPF;
