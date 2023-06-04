const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Invalid authentication credentials!"
                });
            });
    }).catch(error => res.status(400).json({ error }));
}


exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(401).json({
                    message: "Invalid authentication credentials!"
                });
                return false;
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            console.log("result", result);

            if (!result) {
                if (res.statusCode)
                    res.status(401).json({
                        message: "Auth failed"
                    });
                return res;
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
                username: fetchedUser.username
            });
        }).catch(error => {

            console.log(" fetched User ? ", fetchedUser);
            console.log(" Error Occured!");
            res.status(400).json({ error })
        });
}