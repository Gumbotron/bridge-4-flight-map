module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    'react/prop-types': 'off', // Can enable if using PropTypes
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'warn', // Changed from error to warning
    'react-hooks/exhaustive-deps': 'warn' // Warning instead of error
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '.github',
    'vite.config.js',
    'tailwind.config.js',
    'postcss.config.js'
  ]
};
