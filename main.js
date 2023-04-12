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

    // check if search input is not empty
    if (searchText !== "") {
      // initialize AOS animations with once: false
      AOS.init({
        once: false,
      });

      // set data-aos-offset to 250
      var aosElements = document.querySelectorAll("[data-aos-offset='310']");
      aosElements.forEach(function(element) {
        element.setAttribute("data-aos-offset", "250");
      });
    } else {
      // initialize AOS animations with once: true
      AOS.init({
        once: true,
      });

      // set data-aos-offset to 310
      var aosElements = document.querySelectorAll("[data-aos-offset='250']");
      aosElements.forEach(function(element) {
        element.setAttribute("data-aos-offset", "310");
      });
    }

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

  // initialize AOS animations with once: true
  AOS.init({
    once: true,
  });

  // set data-aos-offset to 310
  var aosElements = document.querySelectorAll("[data-aos-offset='250']");
  aosElements.forEach(function(element) {
    element.setAttribute("data-aos-offset", "310");
  });
});



// add event listener to scroll button
document.querySelector('button.input__button__shadow').addEventListener('click', function() {
  window.scrollBy({
    top: 600,
    behavior: 'smooth'
  });
});




const books = document.querySelectorAll('.book');
const readButton = document.getElementById('btn-read');

books.forEach(book => {
  book.addEventListener('click', () => {

    // get information about the clicked book
    const cus = book.getAttribute('download');
    const title = book.querySelector('.book-card__title').textContent;
    const description = book.querySelector('.book-card__author').textContent;
    const imageSrc = book.querySelector('.book-cover').style.backgroundImage.replace(/url\(['"](.*)['"]\)/, '$1');

    // get the read path from the data-read attribute
    const readPath = book.getAttribute('data-read');

    // update the popup with book information
    const bookPopup = document.getElementById('book-popup');
    const bookTitle = bookPopup.querySelector('#book-title');
    const bookDescription = bookPopup.querySelector('#book-description');
    const bookImage = bookPopup.querySelector('#book-image');
    const don = bookPopup.querySelector('#don');
    bookTitle.textContent = title;
    bookDescription.textContent = description;
    don.textContent = cus;
    bookImage.src = imageSrc;

    // update the read button with the correct link
    readButton.setAttribute('data-read', readPath);

    // show the popup
    bookPopup.style.display = 'block';

    // handle click event on read button
    readButton.addEventListener('click', () => {
      const readPath = readButton.getAttribute('data-read');
      window.open(readPath, '_blank');
    });
  });
});

function closePopup() {
  const bookPopup = document.getElementById('book-popup');
  bookPopup.style.display = 'none';
}

function share() {
  // show the share input and button
  const whatsappShareButton = document.getElementById("whatsapp-share-button");
  whatsappShareButton.style.display = "flex";

  // get the current page URL
  const pageUrl = window.location.href;
  
  // set the share link to the current page URL
  const shareLinkInput = document.getElementById("share-link");
  shareLinkInput.value = pageUrl;
}

function copyLink() {
  // select the share link input field
  const shareLinkInput = document.getElementById("share-link");
  shareLinkInput.select();
  
  // copy the text inside the input field
  document.execCommand("copy");
  
  // display success message for 2 seconds
  const copySuccessMessage = document.getElementById("copySuccessMessage");
  copySuccessMessage.style.display = "inline-block";
  setTimeout(() => {
    copySuccessMessage.style.display = "none";
  }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.querySelector('.close');
  const bookPopup = document.getElementById('book-popup');
  
  closeButton.addEventListener('click', closePopup);
  
  bookPopup.addEventListener('click', (event) => {
    // check if the click was outside of the popup content
    if (!event.target.closest('.book-info')) {
      closePopup();
    }
  });
});








      

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


// dark



document.getElementById("checkbox").checked = false;

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", function () {
  if (this.checked) {

    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});




setInterval(function() {
  if (Notification.permission === "granted") {
    var options = {
      body: " المؤلف الذهبي "
    }
    var notification = new Notification("عنوان الإشعار هنا",options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        var options = {
          body: "  المؤلف الذهبي"
        }
        var notification = new Notification("  قام بمشاركه كتاب جديد قم بزياره الموقع",options);
      }
    });
  }
}, 3600000); // يتم تحديد وقت الجلسات بهذه الطريقة (10000 ميللي ثانية = 10 ثوانٍ)





















