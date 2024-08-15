export default [
  {
    files: ['**/*.js'], // Adjust this based on your file structure
    languageOptions: {
      ecmaVersion: 2021, // ECMAScript version
      sourceType: 'module', // Set to "script" if not using ES modules
      globals: {
        process: 'readonly', // Define `process` as a global variable
        __dirname: 'readonly', // If you use __dirname
        module: 'readonly', // If you use `module`
        require: 'readonly', // If you use `require`
      },
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-console': 'warn', // Change to 'warn' to see console warnings
      'no-unused-vars': 'warn', // Warn on unused variables
    },
  },
];
