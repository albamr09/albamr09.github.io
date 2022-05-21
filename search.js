/*

Some quick observations for the future:

1. We are not using the lunr library to search per se, because of its inflexibility when trying to search non-complete words
2. Instead we use the contents of our jsonDocuments JSON Object, which is an array where each object contains:

- id: the url of the page
- title: the title of the page
- body: the content of the page

3. So, we use this array to filter, that is we search for the term inside the body and the content wich a basic includes
4. This lets us retrieve and array of json objects of the form previously defined. We order them using the lunr result, which provides
    us with an score. For this we do:
    - For each element in our search result, we map it to the lurn result (where each item in the lunr result has a reference of the form: id + ;; + title)
    - Then we compare the score of the elements to order them (the higher the score the higher the lesser the index inside the array)
5. Finally we create an html list with the results

Note that we could avoid using lunr, because we only use it for the sorting step, but is nice to have better results first.

*/

var searchIndex;
var jsonDocuments;
const separator = ";;";

// Helper function to map between lunrSearchResults and my search results (searchResults)
const mapToLurn = (lunrSearchResults, item) =>
  lunrSearchResults.find(
    (lunrItem) => lunrItem.ref === item.id + separator + item.title
  );

//-----------------------------------------------------------
// LUNR INDEX GENERATION AND RETRIEVAL OF ARRAY OF JSON DOCUMENTS
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
  // Build lunr index (not needed if I simply use
  // includes in the body to filter)
  searchIndex = lunr(function () {
    this.ref("id");
    this.field("title", { boost: 10 });
    this.field("body");
    jsonDocuments.forEach((document) => {
      this.add({
        // The reference is the url and the title
        id: document.id + separator + document.title,
        title: document.title,
        body: document.body,
      });
    });
  });
}

// Create lunr index and obtain json documents
generateIndex();

//-----------------------------------------------------------
// HANDLE THE SEARCH
//-----------------------------------------------------------

// Get form
var form = document.getElementById("search_form");

// Form handler
function handleForm(event) {
  // Do not refresh
  event.preventDefault();
  const searchInput = document.getElementById("search_term");
  const searchTerm = searchInput.value;
  const resultDiv = document.getElementById("search-result");
  let resultList = document.getElementById("search-result-list");
  if (!resultList) {
    resultList = document.createElement("ul");
    resultList.setAttribute("id", "search-result-list");
  } else {
    resultList.innerHTML = "";
  }

  // Obtain results from lunar
  const lunrSearchResults = searchIndex.search(searchTerm);
  // I use my own simple method because it gives me more results
  // Split it into an array of words
  const searchTerms = searchTerm.split(" ");
  const searchResults = jsonDocuments.filter(
    // Basically see if the html body includes the any of the terms
    // or the title includes any of the terms
    (jsonDoc) =>
      // Check for each term, return "true" on the first one that matches (it returns the object)
      searchTerms.find(
        (term) => jsonDoc.body.includes(term) || jsonDoc.title.includes(term)
      )
  );

  // Sort based on lunr results (on the score basically)
  searchResults.sort((first, second) => {
    const firstLunr = mapToLurn(lunrSearchResults, first);
    const secondLunr = mapToLurn(lunrSearchResults, second);
    // If both are found
    if (firstLunr && secondLunr) {
      // Check whose score is higher
      if (firstLunr.score >= secondLunr.score) return -1;
      else return 1;
    }
    // If firsLurn is not found, then we prioritize secondLunr
    else if (secondLunr) {
      return 1;
    }
    // In this case either none are found or firstLunr is found
    // either way we prioritize firstLunr
    else return -1;
  });

  // Create a list of results
  searchResults.forEach((item) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    // If we use lunrSearchResults instead of searchResults (because the ref is a combination of the id + ;; + title)
    //const splittledRef = item.ref.split(separator);
    //a.href = splittledRef[0];
    //a.innerHTML = splittledRef[1];
    a.href = item.id;
    a.innerHTML = item.title;
    li.appendChild(a);
    resultList.appendChild(li);
  });
  resultDiv.append(resultList);
  // Reset input
  searchInput.value = "";
  // Show div only if there was at least one result
  if (searchResults.length > 0) {
    resultDiv.classList.remove("search-result-hide");
    resultDiv.classList.add("search-result-diplay");
  }
}

form.addEventListener("submit", handleForm);

//-----------------------------------------------------------
// HANDLE click outside div
//-----------------------------------------------------------

window.addEventListener("click", function (e) {
  // Get the div
  const resultDiv = document.getElementById("search-result");
  // If the div is showing and the click was outside the div
  if (
    !resultDiv.contains(e.target) &&
    resultDiv.classList.contains("search-result-diplay")
  ) {
    // Add the hide class
    resultDiv.classList.add("search-result-hide");
    // Remove the display class
    resultDiv.classList.remove("search-result-diplay");
  }
});
