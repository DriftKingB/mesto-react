import React, { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onSubmit }) {
  const linkInput = useRef();
  const [ inputErrorMessage, setInputErrorMessage ] = useState(null);
  const [ isValid, setIsValid ] = useState(false);

  useEffect(() => {
    !isOpen && setTimeout(() => handleInputsUpdate(), 200);
  }, [isOpen]);

  function clearFieldset() {
    const input = linkInput.current;

    setInputErrorMessage(null);
    input.value = null;
    input.classList.remove('popup__input_invalid');
  }

  function handleInputsUpdate() {
    setIsValid(false);
    clearFieldset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit({ link: linkInput.current.value });
  }

  function handleChange() {
    const input = linkInput.current;

    setInputErrorMessage(input.validationMessage);
    if (!input.validity.valid) {
      input.classList.add('popup__input_invalid');
      setIsValid(false);
    } else {
      input.classList.remove('popup__input_invalid');
      setIsValid(true);
    }
  }

  return(
    <PopupWithForm 
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isValid={isValid}
      name="avatar-edit" 
      title="Обновить аватар" 
      submitText="Сохранить"
      loadingSubmitText="Сохранение"
      inputFieldset={
        <fieldset className="popup__input-container">
          <div className="popup__field">
            <input
            className="popup__input"
            ref={linkInput} name="avatar" id="avatar-link-input" type="url" placeholder="Ссылка на картинку" required onChange={handleChange} />
            <span className="popup__input-error popup__input-error_type_avatar-link-input"> { inputErrorMessage } </span>
          </div>
        </fieldset>
      } 
    />
  )
}

