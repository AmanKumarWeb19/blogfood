document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-btn");

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    const searchTerm = searchInput.value.toLowerCase();

    // Simulate search functionality (replace with your actual search logic)
    const searchResults = performSearch(searchTerm);

    // Redirect to a search results page with the query as a parameter
    window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
  });

  function performSearch(query) {
    // Simulate search results (replace with your actual search logic)
    const products = [
      { name: "Pizza Margherita", category: "Pizza" },
      { name: "Classic Burger", category: "Burgers" },
      // ... more products
    ];

    const searchResults = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });

    return searchResults;
  }
});
    