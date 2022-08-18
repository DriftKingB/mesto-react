import { useCallback, useEffect, useState } from "react"

export default function PopupWithForm({ name, title, submitText, loadingSubmitText, onClose, onSubmit, isOpen, isValid, inputFieldset, inputs }) {
  const [isLoading, setIsLoading] = useState(false);
  const closeByEscapeCallBack = useCallback((evt) => {
    evt.key === 'Escape' && onClose();
  }, [])
  
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

    setIsLoading(true);
    onSubmit(inputs)
      .finally(() => {
        onClose();
        setIsLoading(false);
      });
  }

  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`} onMouseDown={handleClose} >
      <form className="popup__container" name={`${name}-form`} onSubmit={handleSubmit}>
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close-button" type="button" onClick={onClose} />
        {inputFieldset}
        <fieldset className="popup__handlers">
          <button className={`popup__submit-button ${!isValid && 'popup__submit-button_inactive'}`}>
            <span className="popup__submit-button-text">
              <span className="popup__submit-text"> { !(isLoading && isOpen) ? submitText : loadingSubmitText } </span>
              <span className={`popup__loading-icon ${ isLoading && "popup__loading-icon_active" }`} />
            </span>
          </button>
          <span className="popup__submit-error"></span>
        </fieldset>
      </form>
    </section>
  )
}