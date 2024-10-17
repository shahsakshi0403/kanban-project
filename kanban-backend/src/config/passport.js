import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.PASSPORT_CLIENT_ID ?? "", 
            clientSecret: process.env.PASSPORT_CLIENT_SECRET ?? "",
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        function (accessToken, refreshToken, profile, done) {
            // Implement your verification logic here
            done(null, profile);
        }
    )
);

export default passport;
