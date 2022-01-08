const express = require("express");
const app = express()
const port = 3000;

var somePerson = {
    name    : "Shreyas",
    company : "Veritas"
}

app.get('/', (req, res) =>{
    res.send(JSON.stringify(somePerson))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
