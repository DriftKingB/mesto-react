import { useEffect, useRef, useState } from "react";

export default function useInputHandling({ defaultInputs, defaultInputIsValidState }, isOpen) {
  const [ inputs, setInputs ] = useState(defaultInputs);
  const isValid = useRef();

  useEffect(() => {
    if (isOpen) {
      const someInputIsInvalid = Object.values(inputs).some(input => !(input?.isValid ?? defaultInputIsValidState));

      !someInputIsInvalid ? (isValid.current = true) : (isValid.current = false);
    }
  }, [inputs]);

  function handleInputsUpdate() {
    setInputs(defaultInputs);
    isValid.current = false;
  }

  function handleChange(evt) {
    const input = evt.target;
    const value = input.value;
    const isValid = input.validity.valid;
    const errorMessage = input.validationMessage;

    setInputs({ ...inputs, [input.name]: { value, isValid, errorMessage } });
  }

  return [ inputs, isValid.current, handleInputsUpdate, handleChange ];
}