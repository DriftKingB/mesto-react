import { useCallback, useEffect, useState } from "react"

export default function PopupWithForm({ name, title, submitText, loadingSubmitText, onClose, onSubmit, isOpen, isLoading, isValid, inputFieldset, inputs }) {
  const closeByEscapeCallBack = useCallback((evt) => {
    evt.key === 'Escape' && onClose();
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeByEscapeCallBack);
    } else {
      document.removeEventListener('keydown', closeByEscapeCallBack);
    }
  }, [isOpen]);

  function handleClose(evt) {
    evt.target.classList.contains('popup') && onClose();
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit(inputs);
  }

  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`} onMouseDown={handleClose} >
      <form className="form" name={`${name}-form`} onSubmit={handleSubmit}>
        <h2 className="form__title">{title}</h2>
        <button className="form__close-button" type="button" onClick={onClose} />
        {inputFieldset}
        <fieldset className="form__handlers">
          <button className={`form__submit-button ${!isValid && 'form__submit-button_inactive'}`} disabled={!isValid} >
            <span className="form__submit-button-text">
              <span className="form__submit-text"> { !(isLoading && isOpen) ? submitText : loadingSubmitText } </span>
              <span className={`form__loading-icon ${ isLoading && "form__loading-icon_active" }`} />
            </span>
          </button>
          <span className="form__submit-error"></span>
        </fieldset>
      </form>
    </section>
  )
}