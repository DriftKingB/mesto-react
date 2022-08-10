export default function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image-view ${props.card ? "popup_active" : ""}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
        <p className="popup__image-title">{props.card?.name}</p>
      </div>
    </section>
  )
}