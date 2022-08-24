import AuthForm from "./AuthForm";
import useInputHandling from "../../custom_hooks/useInputHandling";

export default function Register({ onSubmit, isLoading }) {
  const isOpen = true;
  const hookConfig = {
    defaultInputs: { email: { value: '' }, password: { value: '' } },
    defaultInputIsValidState: false
  }
  const [ inputs, isValid, handleChange ] = useInputHandling(hookConfig, isOpen);

  return(
    <AuthForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      isValid={isValid}
      inputs={inputs}
      name="register" 
      title="Регистрация" 
      submitText="Зарегистрироваться"
      inputFieldset={
        <fieldset className="auth-form__input-container">
          <div className="auth-form__field">
            <input
              className={`auth-form__input ${!(inputs.email?.isValid ?? true) && "auth-form__input_invalid"}`} 
              name="email" 
              id="email-input" 
              type="email" 
              placeholder="Email" 
              required 
              onChange={handleChange} 
              value={inputs.email?.value} 
            />
            <span className="auth-form__input-error"> { inputs.email?.errorMessage } </span>
          </div>
          <div className="auth-form__field">
            <input 
              className={`auth-form__input ${!(inputs.password?.isValid ?? true) && "auth-form__input_invalid"}`} 
              name="password" 
              id="password-input" 
              type="password" 
              placeholder="Пароль" 
              required
              minLength="2" 
              maxLength="30" 
              onChange={handleChange} 
              value={inputs.password?.value} 
            />
            <span className="auth-form__input-error"> { inputs.password?.errorMessage } </span>
          </div>
        </fieldset>
      } 
    />
  )
}