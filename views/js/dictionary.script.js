function getDictionary() {
  fetch("http://localhost:3000/api/dictionary", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status: " + response.status);
      }
    })
    .then((dictionary) => {
      console.log(dictionary.data);
      displayDictionary(dictionary.data);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

function displayDictionary(dictionary) {
  const listContainer = document.getElementById("dictionary-list");

  listContainer.innerHTML = "";

  dictionary.forEach((dictionary) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${dictionary.term}`;
    listContainer.appendChild(listItem);
  });
}
