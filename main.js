const form = document.querySelector("form");
const btnSearch = document.querySelector('form input[type="submit"]');
const resultsDiv = document.querySelector(".results");

const apiKey = "YOUR_API_KEY";

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

btnSearch.addEventListener("click", async () => {
  try {
    clearHTML();

    const inputValue = document.querySelector("#finder").value;

    const response = await fetchData(inputValue);
    const { data } = await response.json();

    data.forEach((gif) => {
      const a = document.createElement("a");
      a.href = `${gif.images.original.url}`;
      a.target = "_blank";

      const img = document.createElement("img");
      img.src = gif.images.original.url;
      img.setAttribute("href", gif.images.original.url);
      img.alt = "View on Giphy";

      a.appendChild(img);

      resultsDiv.appendChild(a);
    });
  } catch (err) {
    console.error(err);
  }
});

async function fetchData(input) {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input}`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
}

const clearHTML = () => {
  if (resultsDiv.hasChildNodes()) {
    resultsDiv.innerHTML = "";
  } else {
    return;
  }
};
