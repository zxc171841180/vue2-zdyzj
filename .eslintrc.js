module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
   "eslint:recommended",
    // "@vue/prettier"
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars":0,
    "no-constant-condition":0,
    "no-cond-assign":0,
    "no-async-promise-executor":0,
    "no-redeclare":0,
    "no-irregular-whitespace":0,
    "no-mixed-spaces-and-tabs":0,



  },
};
