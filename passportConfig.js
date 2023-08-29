const db = require('./db');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            const q = "SELECT * FROM stasz_user.account WHERE username = ?";
            db.query(q, [username], (err, result) => {
                if (err) {throw err};
                if (result.length === 0) {
                    return done(null, false, {message: "User does not exist"});
                }
                bcrypt.compare(password, result[0].password, (err, isMatch) => {
                    if (err) {throw err};
                    if (isMatch) {
                        return done(null, result[0]);
                    } else {
                        return done(null, false, {message: "Password is incorrect"});
                    }
                });
            });
        }
    ));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        const q = "SELECT * FROM stasz_user.account WHERE id = ?";
        db.query(q, [id], (err, result) => {
            if (err) {throw err};
            const userInfo = {
                id: result[0].id,
                username: result[0].username
            };
            cb(null, userInfo);
        });
    });
};