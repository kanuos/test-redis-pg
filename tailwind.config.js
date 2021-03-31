module.exports = {
  purge: [
    './views/**/*.ejs',
    './views/**/*.html',
    './views/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily : {
      "text" : ["Raleway"] 
    },
    extend: { },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
