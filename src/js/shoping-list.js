// Replace takeFromLocal with your actual function implementation
function takeFromLocal(key) {
  // Your implementation...
}

const addToListBtn = document.querySelector('button[data-value=""]');
console.log(addToListBtn);

watchedArray();

if (addToListBtn) {
  addToListBtn.addEventListener('click', showAdd);
}

function showAdd() {
  if (!addToListBtn.classList.contains('js-active')) {
    addToListBtn.classList.add('js-active');
  }
  watchedArray();
}

function watchedArray() {
  takeFromLocal('watched')
    .then(data => {
      const library = document.querySelector('.your-library-class'); // Replace with your library class or ID
      const shoppingListTitle = document.querySelector('.shop-list-title');
      const shoppingListImg = document.querySelector('.shop-list-start-img');

      if (data.length === 0) {
        shoppingListTitle.classList.remove('visually-hidden');
        shoppingListImg.classList.remove('visually-hidden');
      } else {
        shoppingListTitle.classList.add('visually-hidden');
        shoppingListImg.classList.add('visually-hidden');
      }

      const markup = createGalleryMarkup(data);
      library.innerHTML = markup;
    })
    .catch(error => console.log(error));

  if (localStorage.getItem('watched') === null) {
    document.querySelectorAll('.gallery__item').forEach(card => card.remove());
  }
}

const jsGallery = document.querySelector('.js-gallery'); // Replace with your gallery class or ID

let books = JSON.parse(localStorage.getItem('books')) || [];

function createGalleryMarkup(books) {
  return books
    .map(book => {
      return `
      <li class="gallery__item" data-book="${book._id}">
        <!-- Your book markup -->
      </li>`;
    })
    .join('');
}

if (books && books.length > 0) {
  const markup = createGalleryMarkup(books);
  jsGallery.innerHTML = markup;
}

function addEventListenerOnRemoveBookBtn() {
  const removeBookBtn = document.querySelectorAll('.basket-button');
  removeBookBtn.forEach(btn => {
    btn.addEventListener('click', removeBook);
  });
}

function removeBook(event) {
  const bookId = event.target.dataset.shoppingListBookId;
  const index = books.findIndex(book => book._id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    const markup = createGalleryMarkup(books);
    jsGallery.innerHTML = markup;
    if (books.length === 0) {
      const shoppingListTitle = document.querySelector('.shop-list-title');
      const shoppingListImg = document.querySelector('.shop-list-start-img');
      shoppingListTitle.classList.remove('visually-hidden');
      shoppingListImg.classList.remove('visually-hidden');
    }
  }
}

addEventListenerOnRemoveBookBtn();
