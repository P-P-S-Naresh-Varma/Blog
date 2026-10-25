const filterButtons = document.querySelectorAll(".filter-chip");
const reviewGrid = document.querySelector(".review-grid");
const emptyState = document.querySelector(".empty-state");
const searchInput = document.querySelector("#review-search");
let selectedFilter = "all";

function updateReviews() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const reviewCards = reviewGrid.querySelectorAll(".review-card");
  let visibleCount = 0;

  reviewCards.forEach((card) => {
    const categories = card.dataset.category.split(" ");
    const matchesFilter = selectedFilter === "all" || categories.includes(selectedFilter);
    const matchesSearch = card.textContent.toLocaleLowerCase().includes(query);
    const isVisible = matchesFilter && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.textContent = "No bites found. Try another place or dish.";
  emptyState.hidden = visibleCount > 0;
}

function makeTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createReviewCard(review) {
  const requiredFields = ["place", "location", "dish", "review", "image", "imageAlt"];
  if (
    !review ||
    requiredFields.some((field) => typeof review[field] !== "string" || !review[field].trim()) ||
    !Array.isArray(review.categories) ||
    review.categories.some((category) => typeof category !== "string")
  ) {
    throw new Error("A food diary entry is missing a required field or has invalid filters.");
  }

  const card = document.createElement("article");
  card.className = "review-card";
  card.dataset.category = review.categories.join(" ");

  const imageWrap = document.createElement("div");
  imageWrap.className = "card-image";
  const image = document.createElement("img");
  image.src = review.image;
  image.alt = review.imageAlt;
  image.loading = "lazy";
  imageWrap.append(image);

  const content = document.createElement("div");
  content.className = "card-content";
  content.append(makeTextElement("h3", "", review.place));
  content.append(makeTextElement("p", "card-location", `↗ ${review.location}`));

  const dish = document.createElement("p");
  dish.className = "card-dish";
  dish.append(makeTextElement("span", "", "I had"), document.createTextNode(review.dish));
  content.append(dish);
  content.append(makeTextElement("p", "card-review", review.review));

  if (typeof review.story === "string" && review.story.trim()) {
    const details = document.createElement("details");
    details.className = "card-more";
    const summary = document.createElement("summary");
    summary.append(
      document.createTextNode("Read the full note"),
      makeTextElement("span", "expand-icon", "+"),
    );
    details.append(summary);

    const note = document.createElement("div");
    note.className = "expanded-note";
    review.story
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .forEach((paragraph) => note.append(makeTextElement("p", "", paragraph)));
    details.append(note);
    content.append(details);
  }

  card.append(imageWrap, content);
  return card;
}

async function loadReviews() {
  emptyState.hidden = false;
  emptyState.textContent = "Loading the food diary…";

  try {
    const response = await fetch("data/reviews.json");
    if (!response.ok) {
      throw new Error(`Could not load food diary entries (${response.status}).`);
    }

    const reviews = await response.json();
    if (!Array.isArray(reviews)) {
      throw new Error("Food diary data should be a list of entries.");
    }

    const cards = reviews.map(createReviewCard);
    reviewGrid.replaceChildren(...cards);
    updateReviews();
  } catch (error) {
    console.error("Unable to load the TiredRice food diary.", error);
    emptyState.textContent = "The food diary couldn’t load. Please try again in a moment.";
    emptyState.hidden = false;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    updateReviews();
  });
});

searchInput.addEventListener("input", updateReviews);

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    event.preventDefault();
    searchInput.focus();
  }
});

loadReviews();
