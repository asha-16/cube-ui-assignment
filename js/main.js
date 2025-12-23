
// =============================
// NAV BAR
// =============================

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  console.log("clicked");
});



// =============================
// PRODUCT PAGE 
// =============================

const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
const subscriptionCards = document.querySelectorAll('.subscription-card');

subscriptionRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    // Remove active class from all cards
    subscriptionCards.forEach(card => card.classList.remove('active'));

    // Add active to selected card
    const selectedCard = radio.closest('.subscription-card');
    selectedCard.classList.add('active');
  });
});

// -----------------------------
// Gallery: Image Switching
// -----------------------------
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

// Function to update gallery images and active states
function updateGallery(index, activeThumb) {
  currentIndex = index;
  mainImage.src = images[index];

  // Update thumbnails
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  if (activeThumb) activeThumb.classList.add('active');

  // Update dots
  dots.forEach((dot, i) => {
    dot.src = i === index ? 'assets/icons/dot-filled.png' : 'assets/icons/dot-outline.png';
  });
}

// Click on thumbnail
thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    updateGallery(Number(thumb.dataset.index), thumb);
  });
});

// Click on dots
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    updateGallery(Number(dot.dataset.index));
  });
});

// Arrow navigation
nextBtn.addEventListener('click', () => {
  updateGallery((currentIndex + 1) % images.length);
});

prevBtn.addEventListener('click', () => {
  updateGallery((currentIndex - 1 + images.length) % images.length);
});

// -----------------------------
// Add to Cart Button
// -----------------------------
const addToCartBtn = document.querySelector(".add-to-cart-btn");

addToCartBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Get selected subscription
  const plan = document.querySelector('input[name="subscription"]:checked')?.value;

  // Determine price
  const price = plan === "Double Subscription" ? "169.99" : "99.99";

  // Get selected fragrances
  let fragrance1 = "";
  let fragrance2 = "";

  if (plan === "Single Subscription") {
    fragrance1 = document.querySelector('input[name="single-fragrance"]:checked')?.value;
  }

  if (plan === "Double Subscription") {
    fragrance1 = document.querySelector('input[name="double-fragrance-1"]:checked')?.value;
    fragrance2 = document.querySelector('input[name="double-fragrance-2"]:checked')?.value;
  }

  // Build URL params
  const params = new URLSearchParams({
    plan,
    fragrance1,
    fragrance2,
    price
  });

  // Redirect to invoice page
  window.location.href = `invoice.html?${params.toString()}`;
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


//STATS
const counters = document.querySelectorAll(".stat-item h3");

const countUp = (counter) => {
  const target = +counter.dataset.target;
  let current = 0;
  const increment = target / 60; // controls speed

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.textContent = `${Math.ceil(current)}%`;
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = `${target}%`;
    }
  };

  updateCounter();
};

const statsSection = document.querySelector(".stats");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => countUp(counter));
        observer.unobserve(statsSection); // run only once
      }
    });
  },
  {
    threshold: 0.4
  }
);

observer.observe(statsSection);




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



//pages appear on scroll ---> triggering fade-on-scroll
  document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.fade-on-scroll');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    }
  );

  sections.forEach(section => observer.observe(section));
});
