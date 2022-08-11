export default function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card)
  }

  return (
    <article className="card" id={card._id}>
      <div className="card__image-container" onClick={handleCardClick}>
        <img className="card__image" src={card.link} alt={card.name} />
      </div>
      <div className="card__tab">
        <h2 className="card__title"> {card.name} </h2>
        <div className="card__likes">
          <button className="card__like-button" type="button" />
          <div className="card__loading-icon" />
          <span className="card__likes-number"> {card.likes.length} </span>
        </div>
      </div>
      <button className="card__delete-button" />
    </article>
  )
}