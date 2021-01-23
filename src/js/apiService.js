const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '19999371-811acb2fbb8c6314c2455af9d';
const errorMsg = 'No matches were found! Try again :)';

// Methods to handle search queries
export default {
  searchQuery: '',
  pageNumber: 1,
  perPage: 12,
  totalPages: 0,
  isLastPage: false,

  fetchImages() {
    const params = `image_type=photo&orientation=horizontal&page=${this.pageNumber}&per_page=${this.perPage}`
    const url = `${BASE_URL}?q=${this.searchQuery}&key=${apiKey}&${params}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits, totalHits }) => {
        this.totalPages = Math.ceil(totalHits / this.perPage);

        // Checking if the currently fetched batch of images is the last page
        if (this.totalPages === this.pageNumber) {
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }
        // Still, if no matches are returned by API, we will show an error that nothing was found
        if (!this.totalPages) {
          return Promise.reject(errorMsg);
        }

        this.setPage();
        return hits;
      });
  },
  setPage() {
    this.pageNumber += 1;
  },
  resetPage() {
    this.pageNumber = 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  },
};
