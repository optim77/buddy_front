module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                bracketSpacing: true,
                prettier: 'never',
            },
        ],
        'import/order': 'off',
        'max-len': [
            'error',
            {
                code: 120,
            },
        ],
    },
};
