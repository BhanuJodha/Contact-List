const express = require("express");
const path = require("path");
const port = 8000;

const app = express();
const db = require("./config/mongoose");
const Contact = require("./models/contact");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))


// Middlewares
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static("assets"));

app.use((req, res, next) => {
    if (req._body) {
        console.log(req.body);
    }
    next();
})


// Controllers
app.get("/", (req, res) => {
    Contact.find((err, collection)=>{
        if (err){
            return console.log(err);
        }
        return res.render("home", {
            name: "Bhanu",
            contact_list: collection
        });
    })
})

app.get("/delete-contact", (req, res) => {
    Contact.findByIdAndDelete(req.query.id, (err)=>{
        if (err){
            return console.log(err);
        }
        return res.redirect("/");
    })
})

app.post("/add-contact", (req, res) => {
    Contact.create(req.body, (err, document) => {
        if (err) {
            console.error(err);
        }
        return res.redirect("back");
    })
})




// Server Start
app.listen(port, err => {
    if (err) {
        console.log("Error in running the server :", err);
        return;
    }
    console.log("Server is running on port :", port);
})