import React, { useEffect, useState } from 'react';

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { CurrentUserContext } from './contexts/CurrentUserContext';
import api from './utils/Api';

import ImagePopup from "./components/Popups/ImagePopup";
import EditProfilePopup from './components/Popups/EditProfilePopup';
import AddPlacePopup from './components/Popups/AddPlacePopup';
import EditAvatarPopup from './components/Popups/EditAvatarPopup';
import RemoveCardPopup from './components/Popups/RemoveCardPopup';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [isEditPopupOpen, setProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setCardPopupState] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupState] = useState(false);
  const [isRemoveCardPopupOpen, setRemovePopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToRemove, setCardToRemove] = useState(null);


  useEffect(() => {
    api.getUserInfo()
      .then(data => setCurrentUser(data))
      .catch(err => console.log(err));
    api.getCohortCards()
      .then(cardList => setCards(cardList))
      .catch(err => console.log(err));
  }, [])

  function handleEditAvatarClick() {
    setAvatarPopupState(true);
  }
  
  function handleEditProfileClick() {
    setProfilePopupState(true);
  }
  
  function handleAddPlaceClick() {
    setCardPopupState(true);
  }

  function handleRemoveCardClick(card) {
    setCardToRemove(card);
  }

  function handleCardClick(card) {
    setImagePopupState(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setAvatarPopupState(false);
    setCardPopupState(false);
    setProfilePopupState(false);
    setImagePopupState(false);

    setCardToRemove(null);
    setTimeout(() => { setSelectedCard(null) }, 200);
  }

  function handleCardLike(card) {
    const likedByUser = card.likes.some(user => user._id === currentUser._id );
    const request = !likedByUser ? api.putCardLike(card._id) : api.removeCardLike(card._id) ;

    return request
      .then(res => {
        setCards(cards.map((cardItem) => res._id === cardItem._id ? res : cardItem));
      })
      .catch(err => console.log(err));
  }

  function handleCardRemoval(card) {
    return api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((cardItem) => cardItem._id !== card._id && cardItem ));
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace({ name, link }) {
    return api.postSectionItem(name.value, link.value)
      .then(res => {
        setCards([res, ...cards]);
      })
      .catch(err => console.log(err));
  }

  function handleEditProfile({ name, about }) {
    return api.patchUserInfo(name.value, about.value)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }

  function handleEditAvatar({ link }) {
    return api.patchUserAvatar(link)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <Header />
      { 
        (currentUser && cards) &&
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardRemoval={handleRemoveCardClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
        />
      }
      <Footer />

      <ImagePopup 
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleAddPlace}
      />
      <RemoveCardPopup 
        onClose={closeAllPopups}
        onSubmit={handleCardRemoval} 
        card={cardToRemove}
      />

      {
        currentUser &&
        <>
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleEditAvatar}
          />
          <EditProfilePopup 
            isOpen={isEditPopupOpen} 
            onClose={closeAllPopups}
            onSubmit={handleEditProfile} 
          />
        </>
      }
      
      
    </CurrentUserContext.Provider>
  );
}

