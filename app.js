// get single random joke data from the Chuck Norris joke API using (ES8) async wait function
// also load the dot animation while waiting for the data to be loaded
const getJoke = async url => {
  createLoading();
  const response = await axios.get(url);
  const result = await response.data;
  const joke = result.value;
  document.querySelector(".loading").style.display = "none";
  displayJoke(joke);
};

//display the joke by selecting the joke container and add a class for styling, set the innerText to the contents of the joke
const displayJoke = joke => {
  const displayContainer = document.querySelector(".joke");
  displayContainer.style.display = "block";
  displayContainer.classList.add("card");
  displayContainer.textContent = joke;
};

//create a dot animation
const createDot = () => {
  const pText = document.querySelector(".loading");
  pText.textContent += ".";
};

//use setInterval function to set the animation display time
const createLoading = () => {
  const element = document.querySelector(".loading");
  const joke = document.querySelector(".joke");
  joke.style.display = "none";
  element.style.display = "block";
  element.textContent = "";
  const timeOut = setInterval(() => {
    createDot();
    if (element.innerText.length > 7) {
      element.style.display = "none";
      clearInterval(timeOut);
    }
  }, 300);
};

//get category name from html, concatenated category name to url, add event listener onclick to html buttons
const addOnclickEvent = () => {
  const categoryArray = Array.from(document.getElementsByClassName("btn"));

  const urlArray = categoryArray.map(category => {
    let categoryName = category.innerText.toLowerCase();
    let url = `https://api.chucknorris.io/jokes/random?category=${categoryName}`;
    return url;
  });

  for (let i = 0; i < categoryArray.length; i++) {
    categoryArray[i].setAttribute("onclick", `getJoke("${urlArray[i]}")`);
  }
};

addOnclickEvent();
