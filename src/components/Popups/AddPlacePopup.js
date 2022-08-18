import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [ inputs, setInputs ] = useState({ name: {}, link: {} });
  const [ isValid, setIsValid ] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const someInputIsInvalid = Object.values(inputs).some(input => !(input?.isValid ?? false));

      !someInputIsInvalid ? setIsValid(true) : setIsValid(false);
    }
  }, [inputs]);

  useEffect(() => {
    !isOpen && setTimeout(() => handleInputsUpdate(), 200)
  }, [isOpen]);

  function handleInputsUpdate() {
    setInputs({ name: { value: '' }, link: { value: '' } });
    setIsValid(false);
  }

  function handleChange(evt) {
    const input = evt.target;
    const value = input.value;
    const isValid = input.validity.valid;
    const errorMessage = input.validationMessage;

    setInputs({ ...inputs, [input.name]: { value, isValid, errorMessage } });
  }

  return(
    <PopupWithForm 
      onClose={onClose}
      onSubmit={onSubmit}
      isOpen={isOpen}
      isValid={isValid}
      inputs={inputs}
      name="card-add" 
      title="Новое место"
      submitText="Создать"
      loadingSubmitText="Создание"
      inputFieldset={
        <fieldset className="popup__input-container">
          <div className="popup__field">
            <input  
              className={`popup__input ${!(inputs.name?.isValid ?? true) && "popup__input_invalid"}`}
              name="name" id="title-input" type="text" placeholder="Название" required minLength="2" maxLength="30" onChange={handleChange} value={inputs.name?.value} />
            <span className="popup__input-error popup__input-error_type_title-input"> { inputs.name?.errorMessage } </span>
          </div>
          <div className="popup__field">
            <input
            className={`popup__input ${!(inputs.link?.isValid ?? true) && "popup__input_invalid"}`}
            name="link" id="link-input" type="url" placeholder="Ссылка на картинку" required onChange={handleChange} value={inputs.link?.value} />
            <span className="popup__input-error popup__input-error_type_link-input"> { inputs.link?.errorMessage } </span>
          </div>
        </fieldset>
      } 
    />
  )
}

