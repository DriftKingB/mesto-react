import Form from "../Form";
import useInputHandling from "../../custom_hooks/useInputHandling";

export default function Register({ onSubmit, isLoading }) {
  const isOpen = true;
  const hookConfig = {
    defaultInputs: { email: { value: '' }, password: { value: '' } },
    defaultInputIsValidState: false
  }
  const [ inputs, isValid, handleInputsUpdate, handleChange ] = useInputHandling(hookConfig, isOpen);

  
  return(
    <Form
      type='auth'
      onSubmit={onSubmit}
      isLoading={isLoading}
      isValid={isValid}
      inputs={inputs}
      name="register" 
      title="Регистрация" 
      submitText="Зарегистрироваться"
      submitSubline='Уже зарегистрированы?'
      inputFieldset={
        <fieldset className="form__input-container form__input-container_type_auth">
          <div className="form__field">
            <input
              className={`form__input form__input_type_auth ${!(inputs.email?.isValid ?? true) ? 'form__input_invalid' : ''}`} 
              name="email" 
              id="email-input" 
              type="email" 
              placeholder="Email" 
              required 
              onChange={handleChange} 
              value={inputs.email?.value} 
            />
            <span className="form__input-error"> { inputs.email?.errorMessage } </span>
          </div>
          <div className="form__field">
            <input 
              className={`form__input form__input_type_auth ${!(inputs.password?.isValid ?? true) ? 'form__input_invalid' : ''}`} 
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
            <span className="form__input-error"> { inputs.password?.errorMessage } </span>
          </div>
        </fieldset>
      } 
    />
  )
}