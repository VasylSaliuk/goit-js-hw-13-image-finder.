import refs from './refs.js';

const basicLightbox = require('basiclightbox');
const {
  galleryListRef,
  modalContainer,
  modalCloseBtn,
  modalImageElement,
  overlay,
} = refs;

// Creating modal window
const galleryModal = basicLightbox.create(modalImageElement);

// Adding event listeners to the gallery list, modal close button, and overlay
galleryListRef.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Functions
// Function that is invoken when the modal is open
function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const originalImageSource = event.target.dataset.source;
  modalImageElement.setAttribute('src', originalImageSource);

  galleryModal.show();

  modalContainer.classList.add('is-open');

  window.addEventListener('keydown', onPressEscape);
}

// Function that is invoked when the modal is closed
function closeModal() {
  if (event.target.nodeName === 'IMG') {
    return;
  }

  modalImageElement.setAttribute('src', '');
  modalContainer.classList.remove('is-open');

  galleryModal.close();

  // Deleting event listeners from window
  window.removeEventListener('keydown', onPressEscape);
}

// Function that closes the modal on Escape key
function onPressEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
