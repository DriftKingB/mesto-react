import React, { useEffect, useState } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link, 
  Redirect
} from 'react-router-dom';

import Register from './AuthForms/Register';
import Login from './AuthForms/Login';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';

import ImagePopup from "./Popups/ImagePopup";
import EditProfilePopup from './Popups/EditProfilePopup';
import AddPlacePopup from './Popups/AddPlacePopup';
import EditAvatarPopup from './Popups/EditAvatarPopup';
import RemoveCardPopup from './Popups/RemoveCardPopup';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const [isEditPopupOpen, setProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setCardPopupState] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [popupIsLoading, setPopupIsLoading] = useState(false);

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

  function handleCardLike(card, loadingFunc) {
    const likedByUser = card.likes.some(user => user._id === currentUser._id );
    const request = !likedByUser ? api.putCardLike(card._id) : api.removeCardLike(card._id) ;

    loadingFunc(true);
    request
      .then(res => {
        setCards(cards.map((cardItem) => res._id === cardItem._id ? res : cardItem));
      })
      .catch(err => console.log(err))
      .finally(() => loadingFunc(false));
  }

  function handleCardRemove(card) {
    setPopupIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((cardItem) => cardItem._id !== card._id && cardItem ));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setPopupIsLoading(false));
  }

  function handleAddPlace({ name, link }) {
    setPopupIsLoading(true);
    api.postSectionItem(name.value, link.value)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setPopupIsLoading(false));
  }

  function handleEditProfile({ name, about }) {
    setPopupIsLoading(true);
    api.patchUserInfo(name.value, about.value)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setPopupIsLoading(false));
  }

  function handleEditAvatar({ link }) {
    setPopupIsLoading(true);
    api.patchUserAvatar(link)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setPopupIsLoading(false));
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          {!isLoggedIn && <Redirect to='/sign-in' />}
          <CurrentUserContext.Provider value={currentUser} >
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
            <ImagePopup 
              isOpen={isImagePopupOpen}
              isLoading={popupIsLoading}
              onClose={closeAllPopups}
              card={selectedCard}
            />
            <AddPlacePopup 
              isOpen={isAddPlacePopupOpen}
              isLoading={popupIsLoading}
              onClose={closeAllPopups}
              onSubmit={handleAddPlace}
            />
            <RemoveCardPopup 
              isLoading={popupIsLoading}
              onClose={closeAllPopups}
              onSubmit={handleCardRemove} 
              card={cardToRemove}
            />

            {
              currentUser &&
              <>
                <EditAvatarPopup 
                  isLoading={popupIsLoading}
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onSubmit={handleEditAvatar}
                />
                <EditProfilePopup
                  isLoading={popupIsLoading}
                  isOpen={isEditPopupOpen} 
                  onClose={closeAllPopups}
                  onSubmit={handleEditProfile} 
                />
              </>
            }      
          </CurrentUserContext.Provider>
          <Footer />
        </Route>
        <Route path='/sign-up'>
          {!isLoggedIn && <Redirect to='/sign-in' />}
          <Register 
            onSubmit={() => {}}
            isLoading={false}
          />
        </Route>
        <Route path='/sign-in'>
          {/* <Login /> */}
        </Route>
      </Switch>
    </Router>
  );
}

