export default function PopupWithForm({ name, title, submitText, onClose, isOpen, inputFieldset }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`}>
      <form className="popup__container" name={`${name}-form`}>
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close-button" type="button" onClick={onClose} />
        {inputFieldset}
        <fieldset className="popup__handlers">
              <button className="popup__submit-button">
                <span className="popup__submit-button-text">
                  <span className="popup__submit-text"> {submitText} </span>
                  <span className="popup__loading-icon" />
                </span>
              </button>
              <span className="popup__submit-error"></span>
        </fieldset>
      </form>
    </section>
  )
}