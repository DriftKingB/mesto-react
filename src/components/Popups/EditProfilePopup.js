import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [ inputs, setInputs ] = useState({ name: {}, about: {} });
  const [ isValid, setIsValid ] = useState(false);

  useEffect(() => {
    const delay = isOpen ? 0 : 200; 
    
    setTimeout(() => handleInputsUpdate(), delay);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const someInputIsInvalid = Object.values(inputs).some(input => !(input?.isValid ?? true));
      
      !someInputIsInvalid ? setIsValid(true) : setIsValid(false);
    }
  }, [inputs]);

  function handleInputsUpdate() {
    setInputs({ name: { value: currentUser.name }, about: { value: currentUser.about } });
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
      name="profile-edit" 
      title="Редактировать профиль" 
      submitText="Сохранить"
      loadingSubmitText="Сохранение"
      inputFieldset={
        <fieldset className="popup__input-container">
          <div className="popup__field">
            <input
              className={`popup__input popup__input_type_name ${!(inputs.name?.isValid ?? true) && "popup__input_invalid"}`} 
              name="name" id="name-input" type="text" placeholder="Имя" required minLength="2" maxLength="40" onChange={handleChange} value={inputs.name?.value} />
            <span className="popup__input-error popup__input-error_type_name-input"> { inputs.name?.errorMessage } </span>
          </div>
          <div className="popup__field">
            <input 
              className={`popup__input popup__input_type_about ${!(inputs.about?.isValid ?? true) && "popup__input_invalid"}`} 
              name="about" id="about-input" type="text" placeholder="О себе" required minLength="2" maxLength="200" onChange={handleChange} value={inputs.about?.value} />
            <span className="popup__input-error popup__input-error_type_about-input"> { inputs.about?.errorMessage } </span>
          </div>
        </fieldset>
      } 
    />
  )
}

