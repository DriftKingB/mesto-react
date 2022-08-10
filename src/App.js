import React from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import PopupWithForm from "./components/PopupWithForm";
import ImagePopup from "./components/ImagePopup";

export default function App() {
  const [isEditPopupOpen, setProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setCardPopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);


  function handleEditAvatarClick() {
    setAvatarPopupState(true);
  }
  
  function handleEditProfileClick() {
    setProfilePopupState(true);
  }
  
  function handleAddPlaceClick() {
    setCardPopupState(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setAvatarPopupState(false);
    setCardPopupState(false);
    setProfilePopupState(false);

    setSelectedCard(null);
  }

  return (
    <>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <ImagePopup 
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditPopupOpen}
        name="profile-edit" 
        title="Редактировать профиль" 
        submitText="Сохранить"
        inputFieldset={
          <fieldset className="popup__input-container">
            <div className="popup__field">
              <input className="popup__input popup__input_type_name" id="name-input" type="text" placeholder="Имя" required minLength="2" maxLength="40" />
              <span className="popup__input-error popup__input-error_type_name-input"></span>
            </div>
            <div className="popup__field">
              <input className="popup__input popup__input_type_about" id="about-input" type="text" placeholder="О себе" required minLength="2" maxLength="200" />
              <span className="popup__input-error popup__input-error_type_about-input"></span>
            </div>
          </fieldset>
        } 
      />
      <PopupWithForm 
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        name="card-add" 
        title="Новое место"
        submitText="Создать"
        inputFieldset={
          <fieldset className="popup__input-container">
            <div className="popup__field">
              <input className="popup__input popup__input_type_name" id="title-input" type="text" placeholder="Название" required minLength="2" maxLength="30" />
              <span className="popup__input-error popup__input-error_type_title-input"></span>
            </div>
            <div className="popup__field">
              <input className="popup__input popup__input_type_about" id="link-input" type="url" placeholder="Ссылка на картинку" required />
              <span className="popup__input-error popup__input-error_type_link-input"></span>
            </div>
          </fieldset>
        } 
      />
      <PopupWithForm 
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        name="avatar-edit" 
        title="Обновить аватар" 
        submitText="Сохранить"
        inputFieldset={
          <fieldset className="popup__input-container">
            <div className="popup__field">
              <input className="popup__input popup__input_type_about" id="avatar-link-input" type="url" placeholder="Ссылка на картинку" required />
              <span className="popup__input-error popup__input-error_type_avatar-link-input"></span>
            </div>
          </fieldset>
        } 
      />
    </>
  );
}