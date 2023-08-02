/*

Some quick observations for the future:

1. First of all our jsonDocuments JSON Object is an array where each object contains:

- id: the url of the page
- title: the title of the page
- body: the content of the page

2. We use this array to populate the index of flexsearch
3. Then we search, using enrich true to retrieve the title for each result. Therefore, flexsearch returns an array of results for title 
and an array of results for contents, like so:
    flexSearchResults = [
      {
        field: "title",
        result: [
          {
            id: url of page,
            title: title of page
          },
          ...
        ]
      }, 
      {
        field: "content",
        result: [
          {
            id: url of page,
            title: title of page
          },
          ...
        ]
      }
    ]
4. We then use streams to manipulate this array to convert it to a final array of the form:
    flexSearchResults = [
      {
        id: page url,
        title: page title
      }
      ...
    ]
  Where there are not duplicates
*/

var jsonDocuments;
// Our flexsearch configuration
var searchIndex = new FlexSearch.Document({
  index: [
    // Configuration for title field
    { field: "title", tokenize: "strict", cache: 100, store: ["title"] },
    // Configuration for content field
    {
      field: "content",
      tokenize: "full",
      context: { resolution: 5, depth: 3, bidirectional: true },
      cache: 100,
      // Show title when searching
      store: ["title"],
    },
  ],
  store: ["title"],
});

//-----------------------------------------------------------
// FLEXSEARCH INDEX GENERATION AND RETRIEVAL OF ARRAY OF JSON DOCUMENTS
//-----------------------------------------------------------

// Retrieve .json file, where there is a JSON object per html file
async function getJSON() {
  return fetch("https://albamr09.github.io/documents.json")
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}

// Generate the index using the .json file we retrieve
async function generateIndex() {
  // Obtain json of html documents
  jsonDocuments = await this.getJSON();
  // Build flexsearch index with the retrieved documents
  jsonDocuments.forEach((document) => {
    searchIndex.add({
      id: document.id,
      title: document.title,
      content: document.body,
    });
  });
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
// Get seach modal
var searchModal = document.getElementById("search-form-modal");
// Get the result modal
const resultDiv = document.getElementById("search-result");

// Form handler
function handleForm(event) {
  // Do not refresh
  event.preventDefault();
  var searchInput;
  // Check if event was from the normal form or from the modal search form
  if (searchModal.style.display == "block") {
    searchInput = document.getElementById("search-input-in-modal");
  } else {
    searchInput = document.getElementById("search_term");
  }
  
  // Make it lowercase for comparing
  const searchTerm = searchInput.value.toLowerCase();
  // Try to search the list
  let resultList = document.getElementById("search-result-list");
  // If it does not exist create it
  if (!resultList) {
    resultList = document.createElement("ul");
    resultList.setAttribute("id", "search-result-list");
  } else {
    // Else erase all of its children
    resultList.innerHTML = "";
  }

  // Search using flexsearch
  let flexSearchResults = searchIndex.search(searchTerm, {
    // Show more information on result (like title)
    enrich: true,
    suggest: true,
  });

  // Because we obtain an array of results, where each element stores
  // the result for a given field: (e.g. title, content)
  flexSearchResults = flexSearchResults
    .map((flexResult) =>
      // 1. For each field
      flexResult.result.map((result) => ({
        // 2. For each result for the field
        // create an object with the title and the id
        title: result.doc.title,
        id: result.id,
      }))
    )
    // Convert this into only one array
    .flat()
    // And now remove duplicates
    .filter(
      (currentResult, index, searchResults) =>
        // Convert filterSearchResult array of objects into an array of only the ids
        searchResults
          .map((result) => result.id)
          // Check if the current result.id is in this new array
          .indexOf(currentResult.id) === index
    );

  // Create a list of results
  flexSearchResults.forEach((item) => {
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
  if (searchModal.style.display == "block") {
    // If the search modal is showing, hide it
    searchModal.style.display = "none";
    // Hide background
    bgModal.style.display = "none";
  }
  // Show div only if there was at least one result
  if (flexSearchResults.length > 0) {
    // Show background modal
    bgModal.style.display = "block";
    resultDiv.classList.remove("search-result-hide");
    resultDiv.classList.add("search-result-diplay");
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
    resultDiv.classList.contains("search-result-diplay")
  ) {
    // Add the hide class
    resultDiv.classList.add("search-result-hide");
    // Remove the display class
    resultDiv.classList.remove("search-result-diplay");
    // Hide background
    bgModal.style.display = "none";
  } else if (!searchModal.contains(e.target) && 
    searchModal.style.display == "block") {
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
    resultDiv.classList.remove("search-result-diplay");
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
    resultDiv.classList.remove("search-result-diplay");
    bgModal.style.display = "none";
    searchModal.style.display = "none";
  }
});
