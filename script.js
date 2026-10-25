const filterButtons = document.querySelectorAll(".filter-chip");
const reviewCards = document.querySelectorAll(".review-card");
const emptyState = document.querySelector(".empty-state");
const searchInput = document.querySelector("#review-search");
let selectedFilter = "all";

function updateReviews() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  reviewCards.forEach((card) => {
    const categories = card.dataset.category.split(" ");
    const matchesFilter = selectedFilter === "all" || categories.includes(selectedFilter);
    const matchesSearch = card.textContent.toLocaleLowerCase().includes(query);
    const isVisible = matchesFilter && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
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
