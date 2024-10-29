/*
Some quick observations for the future:

1. Our `jsonDocuments` object is an array, where each object represents a webpage and contains:

- id: the URL of the page
- title: the title of the page
- body: the content of the page

2. We use this array of documents to create a Fuse.js search index. The Fuse.js library allows fuzzy search on the title and content of these documents.

3. The Fuse.js index is created using specific options:
   - We assign weights to the fields:
     - "title" is given more importance (0.7 weight) because it usually reflects the relevance of a page.
     - "content" is given less importance (0.3 weight) since it may be longer and less specific.
   - We set a `threshold` of 0.3 to define how much fuzzy matching is allowed (a lower threshold means stricter matching).
   - `includeScore: true` is enabled to return the relevance score of each result.
   - `shouldSort: true` ensures that results are returned in the order of relevance.

4. Once the index is built using the retrieved `jsonDocuments`, we can perform searches using a search term. We call `fuse.search()` to query the index.

5. When searching, the Fuse.js library returns an array of results, where each result contains:
   - The object from the `jsonDocuments` array (with the page id, title, and content).
   - A score (showing how relevant the result is to the search term).

6. We process these results as follows:
   - We map through the `fuseResults` array to extract the necessary information (page URL and title).
   - We filter out any duplicate results by comparing their `id` fields.
   - We use this processed data to display the final results in a list format on the webpage.
   
7. The result is a final array of objects where each object contains:
   - id: the page URL
   - title: the page title
   These results are free from duplicates.

8. The search form interacts with the `handleForm` function. When a user submits a search query:
   - The search form input is processed to make the query lowercase (for case-insensitive search).
   - We dynamically update the search result list on the webpage with the title and link for each matching result.

9. The search results are displayed in a `<ul>` list, where each `<li>` contains an anchor (`<a>`) element linking to the page based on the search result.

10. The logic for hiding and displaying the search modal works as follows:
   - If the user clicks outside the search results div, the search results are hidden.
   - If the user presses `Ctrl+K`, the search modal opens, and focus is set on the input field.
   - Pressing the "Escape" key hides the search results and modal.

11. Key Fuse.js configurations to remember:
   - The `keys` option defines which fields in the `jsonDocuments` are searchable (in our case, the title and content).
   - The `threshold` controls how fuzzy the matching is (lower means stricter matches).
   - `shouldSort: true` ensures that results are ordered by relevance.
*/

var jsonDocuments; // Holds the array of documents

//-----------------------------------------------------------
// FUSE SETUP
//-----------------------------------------------------------

// Define Fuse.js options
const fuseOptions = {
  includeScore: true, // Include search score to determine fuzzy match strength
  shouldSort: true, // Sort results by score
  threshold: 0.5, // Adjusts the fuzziness; lower is stricter
  keys: [
    { name: "title", weight: 0.9 }, // Title is more important
    { name: "content", weight: 0.7 }, // Content is less important
  ],
};

// Initialize Fuse instance with options
let fuse;

//-----------------------------------------------------------
// INDEX GENERATION AND RETRIEVAL OF JSON DOCUMENTS
//-----------------------------------------------------------

// Retrieve .json file, where there is a JSON object per HTML file
async function getJSON() {
  return fetch("https://albamr09.github.io/public/documents.json")
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}

// Generate the Fuse index using the retrieved documents
async function generateIndex() {
  // Obtain JSON of HTML documents
  jsonDocuments = await getJSON();
  // Initialize Fuse with the documents and options
  fuse = new Fuse(jsonDocuments, fuseOptions);
}

// Create index and obtain json documents
generateIndex();

//-----------------------------------------------------------
// HANDLE THE SEARCH
//-----------------------------------------------------------

// Get normal form
var searchForm = document.getElementById("search_form");
// Get modal form
var searchModalForm = document.getElementById("search-form-in-modal");
// Get background modal
var bgModal = document.getElementById("search-background");
// Get search modal
var searchModal = document.getElementById("search-form-modal");
// Get the result modal
const resultDiv = document.getElementById("search-result");

// Form handler
function handleForm(event) {
  // Do not refresh
  event.preventDefault();
  var searchInput;
  // Check if event was from the normal form or from the modal search form
  if (searchModal.style.display === "block") {
    searchInput = document.getElementById("search-input-in-modal");
  } else {
    searchInput = document.getElementById("search_term");
  }

  // Convert input to lowercase for comparison
  const searchTerm = searchInput.value.toLowerCase();
  // Create/clear search result list
  let resultList = document.getElementById("search-result-list");
  if (!resultList) {
    resultList = document.createElement("ul");
    resultList.setAttribute("id", "search-result-list");
  } else {
    resultList.innerHTML = "";
  }

  // Search using Fuse.js
  const fuseResults = fuse.search(searchTerm);

  // Map the Fuse.js results to the format we want
  const searchResults = fuseResults
    .map((result) => ({
      // Extract title and id
      title: result.item.title,
      id: result.item.id,
    }))
    // Remove duplicates based on id
    .filter(
      (currentResult, index, searchResults) =>
        searchResults.findIndex((result) => result.id === currentResult.id) ===
        index
    );

  // Display the search results
  searchResults.forEach((item) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    // Each item is the object we created previously of the form {id: url of page, title: title of page}
    a.href = item.id;
    a.innerHTML = item.title;
    li.appendChild(a);
    resultList.appendChild(li);
  });
  resultDiv.append(resultList);

  // Reset input
  searchInput.value = "";

  // Hide search modal if necessary
  if (searchModal.style.display === "block") {
    // If the search modal is showing, hide it
    searchModal.style.display = "none";
    // Hide background
    bgModal.style.display = "none";
  }

  // Show result modal if there are results
  if (searchResults.length > 0) {
    bgModal.style.display = "block";
    resultDiv.classList.remove("search-result-hide");
    resultDiv.classList.add("search-result-display");
  }
}

searchForm.addEventListener("submit", handleForm);
searchModalForm.addEventListener("submit", handleForm);

//-----------------------------------------------------------
// HANDLE click outside div
//-----------------------------------------------------------

window.addEventListener("click", function (e) {
  // If the div is showing and the click was outside the div
  if (
    !resultDiv.contains(e.target) &&
    resultDiv.classList.contains("search-result-display")
  ) {
    // Add the hide class
    resultDiv.classList.add("search-result-hide");
    // Remove the display class
    resultDiv.classList.remove("search-result-diplay");
    // Hide background
    bgModal.style.display = "none";
  } else if (
    !searchModal.contains(e.target) &&
    searchModal.style.display === "block"
  ) {
    // If the search modal is showing, hide it
    searchModal.style.display = "none";
    // Hide background
    bgModal.style.display = "none";
  }
});

//-----------------------------------------------------------
// HANDLE ctrl+k
//-----------------------------------------------------------

window.addEventListener("keydown", function (e) {
  if (e.key === "k" && e.ctrlKey) {
    // Prevent browser's default action
    e.preventDefault();
    // If there are previous search results
    // Add the hide class
    resultDiv.classList.add("search-result-hide");
    // Remove the display class
    resultDiv.classList.remove("search-result-display");
    bgModal.style.display = "block";
    searchModal.style.display = "block";
    // Focut on input
    document.getElementById("search-input-in-modal").focus();
  } else if (e.key === "Escape") {
    // Prevent browser's default action
    e.preventDefault();
    // Hide everything
    // Add the hide class
    resultDiv.classList.add("search-result-hide");
    // Remove the display class
    resultDiv.classList.remove("search-result-display");
    bgModal.style.display = "none";
    searchModal.style.display = "none";
  }
});
