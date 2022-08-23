export default function AuthForm({ inputFieldset }) {
  return(
    <form className="auth-form" name={`${name}-form`} onSubmit={handleSubmit}>
      <h2 className="auth-form__title">{title}</h2>      
      {inputFieldset}
      <fieldset className="auth-form__handlers">
        <button className={`auth-form__submit-button ${!isValid && 'auth-form__submit-button_inactive'}`}>
          <span className="auth-form__submit-button-text">
            <span className="auth-form__submit-text"> { !(isLoading && isOpen) ? submitText : loadingSubmitText } </span>
            <span className={`auth-form__loading-icon ${ isLoading && "auth-form__loading-icon_active" }`} />
          </span>
        </button>
        <span className="auth-form__submit-error"></span>
      </fieldset>
    </form>
  )
}