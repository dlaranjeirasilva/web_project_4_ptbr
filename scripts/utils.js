export const toggleModal = (modal) => {
  modal.classList.toggle("modal_opened");
};

export const handleModalClick = (evt, modal) => {
  if (evt.target.classList.contains("modal")) {
    toggleModal(modal);
  }
};
