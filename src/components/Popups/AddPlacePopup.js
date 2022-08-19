import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useInputHandling from "../../custom hooks/useInputHandling";

export default function AddPlacePopup({ isOpen, isLoading, onClose, onSubmit }) {
  const hookConfig = {
    defaultInputs: { name: { value: '' }, link: { value: '' } },
    defaultInputIsValidState: false
  }
  const [ inputs, isValid, handleInputsUpdate, handleChange ] = useInputHandling(hookConfig, isOpen);

  useEffect(() => {
    !isOpen && setTimeout(() => handleInputsUpdate(), 200);
  }, [isOpen]);

  return(
    <PopupWithForm 
      onClose={onClose}
      onSubmit={onSubmit}
      isOpen={isOpen}
      isLoading={isLoading}
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
              name="name" 
              id="title-input" 
              type="text" 
              placeholder="Название" 
              required 
              minLength="2" 
              maxLength="30" 
              onChange={handleChange} 
              value={inputs.name?.value} 
            />
            <span className="popup__input-error popup__input-error_type_title-input"> { inputs.name?.errorMessage } </span>
          </div>
          <div className="popup__field">
            <input
              className={`popup__input ${!(inputs.link?.isValid ?? true) && "popup__input_invalid"}`}
              name="link" 
              id="link-input" 
              type="url" 
              placeholder="Ссылка на картинку" 
              required 
              onChange={handleChange} 
              value={inputs.link?.value} 
            />
            <span className="popup__input-error popup__input-error_type_link-input"> { inputs.link?.errorMessage } </span>
          </div>
        </fieldset>
      } 
    />
  )
}

