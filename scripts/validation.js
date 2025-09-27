const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(formEl, inputEl, settings) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(settings.inputErrorClass);
  if (errorEl) {
    errorEl.textContent = inputEl.validationMessage;
    errorEl.classList.add(settings.errorClass);
  }
}

function hideInputError(formEl, inputEl, settings) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(settings.inputErrorClass);
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.classList.remove(settings.errorClass);
  }
}

function checkInputValidity(formEl, inputEl, settings) {
  if (inputEl.dataset.touched === "true" && !inputEl.validity.valid) {
    showInputError(formEl, inputEl, settings);
  } else {
    hideInputError(formEl, inputEl, settings);
  }
}

function toggleButtonState(inputList, buttonEl, settings) {
  const isValid = inputList.every((input) => input.validity.valid);
  buttonEl.disabled = !isValid;
  buttonEl.classList.toggle(settings.inactiveButtonClass, !isValid);
}

function setEventListeners(formEl, settings) {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, settings);

  inputList.forEach((inputEl) => {
    inputEl.dataset.touched = "false";
    inputEl.addEventListener("input", () => {
      inputEl.dataset.touched = "true";
      checkInputValidity(formEl, inputEl, settings);
      toggleButtonState(inputList, buttonEl, settings);
    });
  });
}

function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((formEl) => setEventListeners(formEl, settings));
}

enableValidation(validationSettings);

function resetForm(formEl, settings) {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  inputList.forEach((inputEl) => {
    inputEl.value = "";
    inputEl.dataset.touched = "false";
    hideInputError(formEl, inputEl, settings);
  });
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonEl, settings);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) closeModal(modal);
  });
});
