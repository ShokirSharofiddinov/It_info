function getTopic() {
  fetch("http://localhost:3000/api/topic", {
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
    .then((topic) => {
      console.log(topic.data);
      displayTopic(topic.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}


function displayTopic(topic) {
  const listContainer = document.getElementById("topic-list");

  listContainer.innerHTML = "";

  topic.forEach((topic) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${topic.topic_title}: ${topic.topic_text}`;
    listContainer.appendChild(listItem);
  });
}
