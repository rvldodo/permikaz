const LocalStrategy = require("passport-local");
const pool = require("./dbConfig");
const bcrypt = require("bcrypt");

const initialize = (passport) => {
  const authenticateUser = (username, password, done) => {
    pool.query(
      "SELECT * FROM user_permikaz WHERE username = $1",
      [username],
      (err, result) => {
        if (err) throw err;

        if (result.rows.length > 0) {
          const user = result.rows[0];

          bcrypt.compare(password, user.hash_password, (err, isMatch) => {
            if (err) console.log(err);

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        } else {
          return done(null, false, { message: "Username is not registered" });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.username));

  passport.deserializeUser((username, done) => {
    pool.query(
      "SELECT * FROM user_permikaz WHERE username = $1",
      [username],
      (err, result) => {
        if (err) return done(err);

        return done(null, result.rows[0]);
      }
    );
  });
};

module.exports = initialize;
