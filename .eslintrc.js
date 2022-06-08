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

        ],
        "@typescript-eslint/no-use-before-define": ["error", {
            "functions": false, // 有函数提升，原本就应该可以在创建之前使用
            "classes": true,
            "variables": true,
            "allowNamedExports": false
        }]
    }

};
