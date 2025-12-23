const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  console.log("clicked");
});




// PRODUCT PAGE
const subscriptionRadios = document.querySelectorAll(
  'input[name="subscription"]'
);

const subscriptionCards = document.querySelectorAll('.subscription-card');

subscriptionRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    subscriptionCards.forEach(card => card.classList.remove('active'));

    const selectedCard = radio.closest('.subscription-card');
    selectedCard.classList.add('active');
  });
});


//Image switching
const mainImage = document.querySelector('.gallery-main img');
const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
const dots = document.querySelectorAll('.gallery-dots img');
const prevBtn = document.querySelector('.gallery-arrow.left');
const nextBtn = document.querySelector('.gallery-arrow.right');

const images = [
  'assets/images/thumb-1.png',
  'assets/images/thumb-2.png',
  'assets/images/thumb-3.png',
  'assets/images/thumb-4.png'
];

let currentIndex = 0;

function updateGallery(index, activeThumb) {
  currentIndex = index;
  mainImage.src = images[index];

  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  if (activeThumb) activeThumb.classList.add('active');

  dots.forEach((dot, i) => {
    dot.src =
      i === index
        ? 'assets/icons/dot-filled.png'
        : 'assets/icons/dot-outline.png';
  });
}

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    updateGallery(Number(thumb.dataset.index), thumb);
  });
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    updateGallery(Number(dot.dataset.index));
  });
});


//left and right slider logic
// Arrow navigation
nextBtn.addEventListener('click', () => {
  updateGallery((currentIndex + 1) % images.length);
});

prevBtn.addEventListener('click', () => {
  updateGallery(
    (currentIndex - 1 + images.length) % images.length
  );
});



// OUR COLLECTIONS
// Ensure first accordion icon is minus on load
const firstIcon = document.querySelector('.accordion-item.active img');
if (firstIcon) {
  firstIcon.src = 'assets/icons/minus.png';
}


const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  const icon = header.querySelector('img');

  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all items
    accordionItems.forEach(i => {
      i.classList.remove('active');
      const img = i.querySelector('.accordion-header img');
      img.src = 'assets/icons/plus.png';
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
      icon.src = 'assets/icons/minus.png';
    }
  });
});



//COMPARISION TABLE
const table = document.querySelector(".comparison-table");
  const headers = table.querySelectorAll("thead th[data-col]");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const colIndex = header.dataset.col;

      /* Remove highlights */
      table.querySelectorAll("thead th[data-col], tbody td")
        .forEach(el => el.classList.remove("highlight"));

      /* Highlight selected header */
      header.classList.add("highlight");

      /* Highlight corresponding column cells */
      table.querySelectorAll(
        `tbody tr td:nth-child(${colIndex})`
      ).forEach(cell => {
        cell.classList.add("highlight");
      });
    });
  });