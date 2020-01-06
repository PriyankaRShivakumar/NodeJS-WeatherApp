const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const fs = require("fs");
const path = require("path");
const express = require("express"); // It exposes a single function
const hbs = require("hbs");

const app = express(); // Here we create an express app
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); // registerPartials takes a path to the directory where partials are present and register them.

//Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Priyanka"
  });
});

//Read the file about.txt
const aboutBuffer = fs.readFileSync(
  path.join(__dirname, "../public/text/about.txt")
);
const aboutData = aboutBuffer.toString();

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather App",
    name: "Priyanka",
    data: aboutData
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Priyanka",
    message: "Welcome to the Help Section!!"
  });
});

//For app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

//Demo Product query string
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Priyanka",
    errorMessage: "Help Article Not Found"
  });
});

//For 404 page, * means everything that is not matched so far.
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Priyanka",
    errorMessage: "404 Not Found"
  });
});

// To bring the server up.
app.listen(port, () => {
  //Defines what to do when server is up
  console.log("Server is up on port " + port);
});
