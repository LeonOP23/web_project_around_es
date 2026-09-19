import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openModal,
  closeModal,
  handleOverlayClick,
  handleEscClose
} from "./utils.js";


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


/*ELEMENTOS DEL PERFIL*/

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupTypeName = document.querySelector(
  ".popup__input_type_name"
);

const popupTypeDescription = document.querySelector(
  ".popup__input_type_description"
);

const editForm = document.querySelector("#edit-profile-form");


/*ELEMENTOS DEL POPUP "AGREGAR UNA TARJETA"*/


const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector("#new-card-popup");
const addCloseButton = addPopup.querySelector(".popup__close");

const addCardForm = document.querySelector("#new-card-form");

const cardNameInput = document.querySelector(
  "#card-name-input"
);

const cardLinkInput = document.querySelector(
  "#card-url-input"
);


/*POPUP DE IMAGEN*/

const imagePopup = document.querySelector("#image-popup");

const imagePopupCloseButton = imagePopup.querySelector(
  ".popup__close"
);


/*CONTENEDOR DE TARJETAS*/


const cardContainer = document.querySelector(".cards__list");


/*EDITAR PERFIL*/

function fillProfileForm() {
  popupTypeName.value = profileTitle.textContent;
  popupTypeDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = popupTypeName.value;
  const descriptionValue = popupTypeDescription.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closeModal(editPopup);
}


/*AGREGAR UNA NUEVA TARJETA*/

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const card = new Card(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value
    },
    "#card-template"
  );

  cardContainer.prepend(card.getView());

  closeModal(addPopup);

  addCardForm.reset();
}


/*EVENTOS DE LOS POPUPS*/

// Abrir popup de editar perfil
editButton.addEventListener("click", handleOpenEditModal);

// Cerrar popup de editar perfil
editCloseButton.addEventListener("click", () => {
  closeModal(editPopup);
});

// Abrir popup de agregar tarjeta
addButton.addEventListener("click", () => {
  openModal(addPopup);
});

// Cerrar popup de agregar tarjeta
addCloseButton.addEventListener("click", () => {
  closeModal(addPopup);
});

// Cerrar popup de imagen
imagePopupCloseButton.addEventListener("click", () => {
  closeModal(imagePopup);
});


/*EVENTOS DE LOS FORMULARIOS*/

editForm.addEventListener(
  "submit",
  handleProfileFormSubmit
);

addCardForm.addEventListener(
  "submit",
  handleCardFormSubmit
);


/*CREAR LAS TARJETAS INICIALES*/

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");

  cardContainer.prepend(card.getView());
});


/*CONFIGURACIÓN DE VALIDACIÓN*/

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};


/*CREAR INSTANCIAS DE FORMVALIDATOR*/

const editFormValidator = new FormValidator(
  validationConfig,
  editForm
);

const newCardFormValidator = new FormValidator(
  validationConfig,
  addCardForm
);


/*ACTIVAR VALIDACIÓN*/

editFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();


/*CERRAR POPUPS AL HACER CLICK EN EL OVERLAY*/

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClick);
});


/*CERRAR POPUP CON LA TECLA ESCAPE*/

document.addEventListener("keydown", handleEscClose);