module.exports = {
    root: true,
    "extends": [
        "plugin:@reolink-web/recommended",
        // react项目需要包含此项
        "plugin:@reolink-web/react"
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "rules": {
        "@typescript-eslint/naming-convention": [
            "error",
            {
                'selector': 'variable',
                'modifiers': ['const'],
                'format': ['PascalCase', 'camelCase']
            },

        ]
        }
    
};
