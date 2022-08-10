import React, { useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";

export default function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userAbout, setUserAbout] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState('https://www.rgo.ru/sites/default/files/styles/head_image_article/public/1034295-e1477344635669-1.jpg?itok=4U4Dw9en');
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api.patchUserInfo(userName, userAbout);
    api.patchUserAvatar(userAvatar);
    api.getCohortCards()
      .then(data => setCards(data));
  }, []);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
          <button className="profile__avatar-button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name"> {userName} </h1>
          <p className="profile__subline"> {userAbout} </p>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="album">
        {cards.map((card) => {
          return <Card 
          key={card._id} 
          card={card} 
          onCardClick={props.onCardClick} 
          />
        })}
      </section>
    </>
  )
}