module.exports = {
  presets: [
    '@babel/preset-env',
    ["@babel/preset-react", { "runtime": "automatic" }]
  ],
  // Si estás utilizando TypeScript, también puedes agregar este preset
  // presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
};
