import React, { useEffect, useState } from "react";
import api from "../utils/Api";
import Card from "./Card";

export default function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState('Жак-Ив Кусто');
  const [userAbout, setUserAbout] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState('https://www.rgo.ru/sites/default/files/styles/head_image_article/public/1034295-e1477344635669-1.jpg?itok=4U4Dw9en');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.patchUserInfo(userName, userAbout)
      .then(data => {
        setUserName(data.name);
        setUserAbout(data.about);
      })
      .catch(err => console.log(err));
    api.patchUserAvatar(userAvatar)
      .then(data => setUserAvatar(data.avatar))
      .catch(err => console.log(err));
    api.getCohortCards()
      .then(data => setCards(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="content"> 
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
          <button className="profile__avatar-button" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name"> {userName} </h1>
          <p className="profile__subline"> {userAbout} </p>
          <button className="profile__edit-button" type="button" onClick={onEditProfile} />
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace} />
      </section>

      <section className="album">
        {cards.map((card) => <Card 
          key={card._id} 
          card={card} 
          onCardClick={onCardClick} 
          />
        )}
      </section>
    </div>
  )
}