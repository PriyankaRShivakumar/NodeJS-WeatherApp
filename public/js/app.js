//This file will Fetch the Forecast and render it in the Browser
const weatherForm = document.querySelector("form");
const search = document.querySelector("input"); // Value passed in Input
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// Used to add a Event lister, i.e what to do if form is submitted
weatherForm.addEventListener("submit", e => {
  //Here callback function will handle what to do if submit is pressed. Here e is the event object.
  e.preventDefault(); //This will prevent the default behaviour that is refresh of browser.

  const location = search.value; //Fetch the value of search variable.

  //To change the content of the Paragraph Text
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
