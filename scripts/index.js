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
]

initialCards.forEach(function(card) {
  console.log(card.name);
});


//comienzo parte 2 proyecto
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");
// Ventana emergente "Agregar una tarjeta"
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector("#new-card-popup");
const addCloseButton = addPopup.querySelector(".popup__close");

// Event listeners para abrir y cerrar la ventana emergente
addButton.addEventListener("click", () => {
  openModal(addPopup);
});

addCloseButton.addEventListener("click", () => {
  closeModal(addPopup);
});

function openModal(modal) {
   modal.classList.add("popup_is-opened")
};

function closeModal(modal) {
   modal.classList.remove("popup_is-opened")
};

editButton.addEventListener("click", handleOpenEditModal);

editCloseButton.addEventListener("click", () => {
  closeModal(editPopup);
});

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupTypeName = document.querySelector(".popup__input_type_name");
const popupTypeDescription = document.querySelector(".popup__input_type_description");
let formElement = document.querySelector("#edit-profile-form");
// Elementos del formulario de agregar tarjeta
const addCardForm = document.querySelector("#new-card-form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
imagePopupCloseButton.addEventListener("click", () => {
  closeModal(imagePopup);
});

function fillProfileForm() {
  popupTypeName.value = profileTitle.textContent;
  popupTypeDescription.value = profileDescription.textContent;
};

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = popupTypeName.value;
  const descriptionValue = popupTypeDescription.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;


  closeModal(editPopup);
};

//Implementa la función handleCardFormSubmit
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  // Obtener los valores de los campos (igual que haces con el perfil)
  const nameValue = cardNameInput.value;
  const linkValue = cardLinkInput.value;

  // Crear nueva tarjeta usando tu función renderCard existente
  renderCard(nameValue, linkValue, cardContainer);

  // Cerrar el modal (igual que haces con el perfil)
  closeModal(addPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleCardFormSubmit);

//comienzo parte 3 proyecto
function getCardElement(name = "Sin título", link = "./images/placeholder.jpg") {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

const likeButton = cardElement.querySelector(".card__like-button");
  
likeButton.addEventListener("click", handleLikeButton);

const deleteButton = cardElement.querySelector(".card__delete-button");
deleteButton.addEventListener("click", handleDeleteCard);

cardImage.addEventListener("click", handleImageClick);


  return cardElement;
}

function handleImageClick(evt) {
  const image = evt.target;

  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;

  openModal(imagePopup);
}

function handleDeleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

 function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

const cardContainer = document.querySelector(".cards__list");

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardContainer);
});