import { useEffect, useRef, useState } from "react";

export default function useInputHandling({ defaultInputs, defaultInputIsValidState }, isOpen) {
  const [ inputs, setInputs ] = useState(defaultInputs);
  const [ isValid, setIsValid ] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const someInputIsInvalid = Object.values(inputs).some(input => !(input?.isValid ?? defaultInputIsValidState));
      console.log(inputs)

      !someInputIsInvalid ? setIsValid(true) : setIsValid(false);
    }
  }, [inputs]);

  function handleInputsUpdate() {
    setInputs(defaultInputs);
    
    setIsValid(false);
  }

  function handleChange(evt) {
    const input = evt.target;
    const value = input.value;
    const isValid = input.validity.valid;
    const errorMessage = input.validationMessage;
    console.log(value)

    setInputs({ ...inputs, [input.name]: { value, isValid, errorMessage } });
  }

  return [ inputs, isValid, handleInputsUpdate, handleChange ];
}