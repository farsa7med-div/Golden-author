// scrool move muse 
function scrollToSection() {
  window.scrollBy(0, 700);
}

window.onscroll = function () {
  var e = document.getElementById("navbar");
  window.pageYOffset > 5 ? e.classList.add("scrolled") : e.classList.remove("scrolled");
};


//pregrees
function updateProgressBar() {
  let { scrollTop: e, scrollHeight: t, clientHeight: c } = document.documentElement;
  let s = (e / (t - c)) * 100 + "%";
  document.querySelector("#progress-bar").style.setProperty("--progress", s);
}

window.addEventListener("scroll", updateProgressBar);


// get input element and button

var searchInputs = document.querySelectorAll(".search-container input[type='text']");

// get Show All button
var showAllButton = document.getElementById("show-all");

// add event listener to both input elements
searchInputs.forEach(function(searchInput) {
  searchInput.addEventListener("input", function(event) {
    // clear value of other input element
    searchInputs.forEach(function(input) {
      if (input !== event.target) {
        input.value = "";
      }
    });

    // get value of search input and lower case it
    var searchText = searchInput.value.trim().toLowerCase();


    // get all books
    var books = document.querySelectorAll(".book");

    // create array of book objects with title and match count
    var bookObjects = [];
    for (var i = 0; i < books.length; i++) {
      var bookTitle = books[i].querySelector(".book-card__title").textContent.trim().toLowerCase();
      if (bookTitle.indexOf(searchText) > -1) {
        books[i].style.display = "inline-block";
      } else {
        books[i].style.display = "none";
      }
      var matchCount = (bookTitle.match(new RegExp(searchText, "g")) || []).length;
      bookObjects.push({ book: books[i], matchCount: matchCount });
    }

    // sort book objects by match count
    bookObjects.sort(function(a, b) {
      return b.matchCount - a.matchCount;
    });

    // append sorted book elements to container
    var container = document.getElementById("books");
    container.innerHTML = "";
    for (var i = 0; i < bookObjects.length; i++) {
      container.appendChild(bookObjects[i].book);
    }

    // hide Show All button if there is no search text
    if (searchText === "") {
      showAllButton.style.display = "none";
    } else {
      // show Show All button if it is hidden
      if (showAllButton.style.display === "none") {
        showAllButton.style.display = "block";
      }
    }
  });
});

// add event listener to Show All button
// add event listener to Show All button
showAllButton.addEventListener("click", function() {
  // get all search inputs and clear their values
  searchInputs.forEach(function(input) {
    input.value = "";
  });

  // get all books and set opacity to 1
  var books = document.querySelectorAll(".book");
  books.forEach(function(book) {
    book.style.display = "inline-block";
  });

  // hide Show All button again
  this.style.display = "none";
});


// add event listener to scroll button
document.querySelector('button.input__button__shadow').addEventListener('click', function() {
  window.scrollBy({
    top: 600,
    behavior: 'smooth'
  });
});



// popup
const books = document.querySelectorAll('.book');
const downloadLink = document.querySelector('#book-popup .fa-download');
const readButton = document.getElementById('btn-read');

books.forEach(book => {
book.addEventListener('click', () => {

// get information about the clicked book
const title = book.querySelector('.book-card__title').textContent;
const description = book.querySelector('.book-card__author').textContent;
const imageSrc = book.querySelector('.book-cover').style.backgroundImage.replace(/url\(['"](.*)['"]\)/, '$1');

// get the download path and read path from the data-download and data-read attributes
const downloadPath = book.dataset.download;
const readPath = book.dataset.read;

// update the popup with book information
const bookPopup = document.getElementById('book-popup');
const bookTitle = bookPopup.querySelector('#book-title');
const bookDescription = bookPopup.querySelector('#book-description');
const bookImage = bookPopup.querySelector('#book-image');

bookTitle.textContent = title;
bookDescription.textContent = description;
bookImage.src = imageSrc;

// update the download link with the correct path and add the 'download' attribute
downloadLink.href = downloadPath;
downloadLink.setAttribute('download', '');

// show the popup
bookPopup.style.display = 'block';

// handle click event on read button
readButton.addEventListener('click', () => {
  window.open(readPath, '_blank');
});
});
});

function closePopup() {
const bookPopup = document.getElementById('book-popup');
bookPopup.style.display = 'none';
}

const downloadButton = document.getElementById('btn-download');
downloadButton.addEventListener('click', downloadFile);

function downloadFile() {
const downloadPath = downloadLink.href;
fetch(downloadPath)
.then(response => response.blob())
.then(blob => {
const url = window.URL.createObjectURL(new Blob([blob]));
const link = document.createElement('a');
link.href = url;
link.setAttribute('download', 'file.pdf');
document.body.appendChild(link);
link.click();
link.parentNode.removeChild(link);
});
}



const shareButton = document.getElementById('btn-share');
const shareTitle = document.getElementById('share-title');
const shareDescription = document.getElementById('share-description');
const shareLink = document.getElementById('share-link');
const copyButton = document.getElementById('btn-copy');

shareButton.addEventListener('click', () => {
  const title = 'شارك هذا الكتاب';
  const description = 'انسخ الرابط أدناه وشاركه مع أصدقائك:';
  const link = 'https://example.com/book123';

  shareTitle.textContent = title;
  shareDescription.textContent = description;
  shareLink.value = link;

  showSharePopup();
});

copyButton.addEventListener('click', () => {
  shareLink.select();
  navigator.clipboard.writeText(shareLink.value);
  copyButton.textContent = 'تم النسخ!';
});

function showSharePopup() {
  const sharePopup = document.getElementById('share-popup');
  sharePopup.style.display = 'block';
}

function closeSharePopup() {
  const sharePopup = document.getElementById('share-popup');
  sharePopup.style.display = 'none';
  copyButton.textContent = 'نسخ الرابط';
}





      

    // ui
    var messageBox = document.querySelector('.js-message');
  var btn = document.querySelector('.js-message-btn');
  var card = document.querySelector('.js-profile-card');
  var closeBtn = document.querySelectorAll('.js-message-close');

  btn.addEventListener('click',function (e) {
      e.preventDefault();
      card.classList.add('active');
  });

  closeBtn.forEach(function (element, index) {
     console.log(element);
      element.addEventListener('click',function (e) {
          e.preventDefault();
          card.classList.remove('active');
      });
  });
