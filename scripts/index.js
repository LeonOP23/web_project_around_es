import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

/*TARJETAS INICIALES*/

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

/*CONFIGURACIÓN DE VALIDACIÓN*/

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

/*ELEMENTOS DEL PERFIL Y FORMULARIOS*/

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editForm = document.querySelector("#edit-profile-form");
const addCardForm = document.querySelector("#new-card-form");

const popupTypeName = document.querySelector(".popup__input_type_name");
const popupTypeDescription = document.querySelector(
  ".popup__input_type_description"
);

/*INSTANCIA DE USERINFO*/

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description"
});

/*INSTANCIA DE POPUP DE IMAGEN*/

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

/*FUNCIÓN QUE ABRE EL POPUP DE IMAGEN AL HACER CLICK EN UNA TARJETA*/

function handleCardClick(data) {
  imagePopup.open(data);
}

/*FUNCIÓN PARA CREAR LA VISTA DE UNA TARJETA*/

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.getView();
}

/*SECCIÓN DE TARJETAS*/

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    }
  },
  ".cards__list"
);

cardSection.renderItems();

/*INSTANCIA DE POPUP "EDITAR PERFIL"*/

const editProfilePopup = new PopupWithForm("#edit-popup", (formValues) => {
  userInfo.setUserInfo({
    name: formValues.name,
    job: formValues.description
  });

  editProfilePopup.close();
});

editProfilePopup.setEventListeners();

/*INSTANCIA DE POPUP "AGREGAR TARJETA"*/

const addCardPopup = new PopupWithForm("#new-card-popup", (formValues) => {
  const cardElement = createCard({
    name: formValues["place-name"],
    link: formValues.link
  });

  cardSection.addItem(cardElement);

  addCardPopup.close();
});

addCardPopup.setEventListeners();

/*EVENTOS PARA ABRIR LOS POPUPS*/

editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();

  popupTypeName.value = data.name;
  popupTypeDescription.value = data.job;

  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardForm.reset();
  newCardFormValidator.resetValidation();
  addCardPopup.open();
});

/*CREAR INSTANCIAS DE FORMVALIDATOR*/

const editFormValidator = new FormValidator(validationConfig, editForm);
const newCardFormValidator = new FormValidator(validationConfig, addCardForm);

/*ACTIVAR VALIDACIÓN*/

editFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();
