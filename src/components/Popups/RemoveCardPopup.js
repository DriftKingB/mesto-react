import PopupWithForm from "./PopupWithForm";

export default function RemoveCardPopup({ onClose, onSubmit, card }) {
  const isOpen = card ? true : false;

  return(
    <PopupWithForm 
        onClose={onClose}
        onSubmit={onSubmit}
        isOpen={isOpen}
        isValid={true}
        inputs={card}
        name="card-remove" 
        title="Вы уверены?"
        submitText="Да"
        loadingSubmitText="Да"
        inputFieldset={ <></> }
      />
  )
}