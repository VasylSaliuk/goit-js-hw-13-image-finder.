import refs from './refs.js';
import imageCardTpl from '../templates/imageItem.hbs';
import pixabayApi from './apiService.js';
import loadMoreBtnApi from './loadMoreBtn.js';
import showError from './notifications.js';

const { galleryListRef, searchFormRef, loadMoreBtnRef } = refs;

// Hiding the Load more button on start
loadMoreBtnApi.hide();

// Adding event listener to the form
searchFormRef.addEventListener('submit', onImageSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

// Functions
//Function that handles the fetched data.
function showSearchResult() {
  pixabayApi
    .fetchImages()
    .then(dataArray => imageCardTpl(dataArray))
    .then(markup => {
      markupRender(markup, galleryListRef);
      // The condition to prevent the page from scrolling on the very first batch of images
      if (pixabayApi.pageNumber > 2) {
        scrollDown();
      }
      if (pixabayApi.isLastPage) {
        loadMoreBtnApi.hide();
      } else {
        loadMoreBtnApi.show();
        loadMoreBtnApi.enable();
      }
    })
    .catch(er => {
      loadMoreBtnApi.hide();
      showError(er);
    });
}

// Function that handles search form submit
function onImageSearch(event) {
  event.preventDefault();

  pixabayApi.query = searchFormRef.elements.query.value;

  clearGallery(galleryListRef);
  pixabayApi.resetPage();

  showSearchResult();

  searchFormRef.reset();
}

// Function for the Load more button
function onLoadMore() {
  loadMoreBtnApi.disable();
  showSearchResult();
}

// Functions handling markup
function markupRender(markup, place) {
  place.insertAdjacentHTML('beforeend', markup);
}

function clearGallery(place) {
  place.innerHTML = '';
}

// Function for smooth scroll page
function scrollDown() {
  window.scrollBy({
    // The page is scrolled by the height of the window minus the height of the search bar
    top: window.innerHeight - 110,
    behavior: 'smooth',
  });
}
