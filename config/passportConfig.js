const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const { Users } = require("../models");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      (username, password, done) => {
        Users.findOne({ where: { username } })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "User not registered yet" });
            }

            // match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );

  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      return done(null, { uuid: user.uuid });
    });
  });

  passport.deserializeUser((user, done) => {
    process.nextTick(() => {
      Users.findOne({ where: { uuid: user.uuid } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => console.log(err));
    });
  });
};
