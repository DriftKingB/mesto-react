export default function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_active" : ""}`}>
      <form className="popup__container" name={`${props.name}-form`}>
        <h2 className="popup__title">{props.title}</h2>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        {props.inputFieldset}
        <fieldset className="popup__handlers">
              <button className="popup__submit-button">
                <span className="popup__submit-button-text">
                  <span className="popup__submit-text"> {props.submitText} </span>
                  <span className="popup__loading-icon"></span>
                </span>
              </button>
              <span className="popup__submit-error"></span>
        </fieldset>
      </form>
    </section>
  )
}