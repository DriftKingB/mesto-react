import React, { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, isLoading, onClose, onSubmit }) {
  const linkInput = useRef();
  const linkInputError = useRef();
  const [ isValid, setIsValid ] = useState(false);

  useEffect(() => {
    !isOpen && setTimeout(() => handleInputsUpdate(), 200);
  }, [isOpen]);

  function clearFieldset() {
    const input = linkInput.current;

    linkInputError.textContent = '';
    input.value = null;
    input.classList.remove('popup__input_invalid');
  }

  function handleInputsUpdate() {
    setIsValid(false);
    clearFieldset();
  }

  function handleChange() {
    const input = linkInput.current;

    linkInputError.textContent = input.vaalidationMessage;
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
      onSubmit={onSubmit}
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isValid}
      inputs={{link: linkInput.current?.value}}
      name="avatar-edit" 
      title="Обновить аватар" 
      submitText="Сохранить"
      loadingSubmitText="Сохранение"
      inputFieldset={
        <fieldset className="popup__input-container">
          <div className="popup__field">
            <input
              className="popup__input"
              ref={linkInput} 
              name="avatar" 
              id="avatar-link-input" 
              type="url" 
              placeholder="Ссылка на картинку" 
              required 
              onChange={handleChange} 
            />
            <span ref={linkInputError} className="popup__input-error"></span>
          </div>
        </fieldset>
      } 
    />
  )
}

