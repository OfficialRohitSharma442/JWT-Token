const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
const secretkey = "admin@123"
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "a simple api",
        status: 200
    })
})
/* login api  */
app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "Admin",
        email: "admin@fullaccess.com"
    }
    /* creating token */
    jwt.sign({ user }, secretkey, { expiresIn: '300s' }, (err, token) => {
        res.json({
            token
        })
    })
})
/* profile api  */
app.post("/profile", verifyToken, (req, res) => {
    /* this function verify the token using geted token and our seceret key that we use when we cerate token */
    jwt.verify(req.token, secretkey, (err, authdata) => {
        if (err) {
            res.send({ result: "invalid token" })
        } else {
            /* in auth data we the user all value  */
            res.send({ result: authdata })
        }
    })

});
/* This is Middleware function  */
function verifyToken(req, res, next) {
    /* we get the headers by .headers function */
    const bearerheaders = req.headers['authorization'];
    /* this is another way to access token */
    /* const bearerheaders = req.headers.authorization; */

    /* check header is not undefind */
    if (bearerheaders != undefined) {
        let token = bearerheaders.split("ADMIN")[0];
        /* access the token from reqest */
        req.token = token;
        /* next function give access the function access to next function */
        next();
        /*     res.send({ result: 'Token is  valid ' }) */
    } else {
        res.send({ result: 'Token is not valid ' })
    }
}















const port = 5000;
app.listen(port, () => {
    console.log(`sorver is running on https://localhost:${port}`);
})