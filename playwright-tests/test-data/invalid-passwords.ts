// with specifications for a strong password, these should all fail
// password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
export const invalidPasswords  = {
    oneCharacter: "a",
    longOnlyLowercase: "lowerpassword",
    longOnlyUppercase: "UPPERPASSWORD",
    longOnlyNumbers: "1234567890",
    longOnlySpecialChars: "!@#$%^&*()_+",
    longMixedCharsNoUppercase: "lower1234!@#",
    longMixedCharsNoLowercase: "UPPER1234!@#",
    longMixedCharsNoNumbers: "UpperLower!@#",
    longMixedCharsNoSpecialChars: "UpperLower1234",
    shortMixedChars: "Ab1!",
}
