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

formElement.addEventListener("submit", handleProfileFormSubmit);