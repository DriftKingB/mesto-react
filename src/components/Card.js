export default function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card)
  }

  return (
    <article className="card" id={props.card._id}>
      <div className="card__image-container" onClick={handleCardClick}>
        <img className="card__image" src={props.card.link} alt={props.card.name} />
      </div>
      <div className="card__tab">
        <h2 className="card__title"> {props.card.name} </h2>
        <div className="card__likes">
          <button className="card__like-button" type="button"></button>
          <div className="card__loading-icon"></div>
          <span className="card__likes-number"> {props.card.likes.length} </span>
        </div>
      </div>
      <button className="card__delete-button"></button>
    </article>
  )
}