 function getAuthor() {
  localStorage.setItem(
    "accessToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTI4NmRjOGJiNTk2NzBjNzM1YTMwMyIsImlzX2V4cGVydCI6dHJ1ZSwiYXV0aG9yUm9sZXMiOlsiUkVBRCIsIldSSVRFIl0sImlhdCI6MTY4NzUwMjcxMywiZXhwIjoxNjg3NTg5MTEzfQ.mut5OQ-SKpd_sVxgH2lRU4MboIziB2917anhNdNdDC4"
  );
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  fetch("http://localhost:3000/api/author", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
    .then((author) => {
      console.log(author.data);
      displayAuthors(author.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function displayAuthors(author) {
  const listContainer = document.getElementById("author-list");

  listContainer.innerHTML = "";

  author.forEach((author) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${author.author_first_name} ${author.author_last_name} - ${author.author_email}`;
    listContainer.appendChild(listItem);
  });
}
