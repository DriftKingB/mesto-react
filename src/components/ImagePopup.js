export default function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image-view ${card ? "popup_active" : ""}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__image-title">{card?.name}</p>
      </div>
    </section>
  )
}