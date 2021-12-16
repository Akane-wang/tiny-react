module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint",
        "react-hooks",
        "react"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
        "brace-style": "off",
        "@typescript-eslint/brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
        "camelcase": "off",
        "max-len": ["error", 130],
        "@typescript-eslint/ban-types": ["error", {
            "types": {

                "String": {
                    "message": "Use string instead",
                    "fixWith": "string"
                },
                "Number": {
                    "message": "Use number instead",
                    "fixWith": "number"
                },
                "Boolean": {
                    "message": "Use number instead",
                    "fixWith": "boolean"
                },
                "Object": {
                    "message": "Use {} instead",
                    "fixWith": "{}"
                }
            }
        }],
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": ["error"],
        "@typescript-eslint/no-base-to-string": ["warn"],
        "@typescript-eslint/await-thenable": ["error"],
        "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],
        "@typescript-eslint/prefer-as-const": "error",
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/no-floating-promises": ["error", { "ignoreVoid": false }],
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/prefer-regexp-exec": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/no-extra-parens": "off",
        "@typescript-eslint/no-extra-non-null-assertion": "error",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/default-param-last": "error",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/explicit-function-return-type": ["error", {
            "allowExpressions": true
        }],
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-require-imports": "warn",
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "func-call-spacing": "off",
        "@typescript-eslint/func-call-spacing": ["error", "never"],
        "@typescript-eslint/no-namespace": ["error", {

            "allowDeclarations": true,
            "allowDefinitionFiles": true
        }],
        "@typescript-eslint/consistent-type-assertions": ["error", {
            "assertionStyle": "as"
        }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": false,
            "caughtErrors": "all"
        }],
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": ["error"],
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": ["error"],
        "no-constant-condition":"off",
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": ["error"],
        "@typescript-eslint/unified-signatures": ["error"],
        "semi": "off",
        "@typescript-eslint/semi": ["error"],
        "@typescript-eslint/no-use-before-define": ["error"],
        "@typescript-eslint/no-unnecessary-type-assertion": ["error"],
        "@typescript-eslint/no-unnecessary-type-arguments": ["error"],
        "@typescript-eslint/unbound-method": ["error"],
        "@typescript-eslint/type-annotation-spacing": ["error"],
        "@typescript-eslint/no-unnecessary-condition": ["off"],
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["warn"],
        "@typescript-eslint/member-ordering": ["off"],
        "@typescript-eslint/no-this-alias": [
            "warn",
            {
                "allowDestructuring": true,
                "allowedNames": ["_this"]
            }
        ],
        "@typescript-eslint/no-explicit-any": ["off", {
            "fixToUnknown": true,
            "ignoreRestArgs": true
        }],
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "@typescript-eslint/member-delimiter-style": ["error", {
            "multiline": {
                "delimiter": "semi",
                "requireLast": true
            },
            "singleline": {
                "delimiter": "semi",
                "requireLast": true
            }
        }],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "default",
                "format": ["camelCase"],
                "leadingUnderscore": "forbid"
            },
            {
                "selector": "parameter",
                "format": ["PascalCase"],
                "filter": {
                    "regex": "^[A-Z]",
                    "match": true
                }
            },
            {
                "selector": "parameter",
                "format": ["camelCase"],
                "modifiers": ["unused"],
                "leadingUnderscore": "allow"
            },
            {
                "selector": "parameter",
                "format": ["camelCase"]
            },
            {
                "selector": "memberLike",
                "modifiers": ["private"],
                "format": ["camelCase"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "memberLike",
                "modifiers": ["protected"],
                "format": ["camelCase"],
                "leadingUnderscore": "require"
            },
            {
                "selector": "memberLike",
                "modifiers": ["private", "static"],
                "format": [],
                "custom": {
                    "regex": "^_\\$[^_]",
                    "match": true
                }
            },
            {
                "selector": "memberLike",
                "modifiers": ["protected", "static"],
                "format": [],
                "custom": {
                    "regex": "^_\\$[^_]",
                    "match": true
                }
            },
            {
                "selector": "enumMember",
                "format": ["UPPER_CASE"]
            },
            {
                "selector": "objectLiteralProperty",
                "format": []
            },
            {
                "selector": "variable",
                "modifiers": ["const"],
                "format": ["PascalCase"],
                "filter": {
                    "regex": "^Comp[A-Z]",
                    "match": true
                }
            },
            {
                "selector": "variable",
                "format": ["camelCase", "UPPER_CASE", "PascalCase"]
            },
            {
                "selector": "variable",
                "modifiers": ["const"],
                "format": ["UPPER_CASE", "camelCase", "PascalCase"]
            },
            {
                "selector": "variable",
                "modifiers": ["const"],
                "format": ["UPPER_CASE", "camelCase", "PascalCase"]
            },
            {
                "selector": "typeParameter",
                "format": ["PascalCase"],
                "prefix": ["T"]
            },
            {
                "selector": "interface",
                "format": ["PascalCase"],
                "custom": {
                    "regex": "^I[A-Z]",
                    "match": true
                }
            },
            {
                "selector": "class",
                "format": ["PascalCase"]
            },
            {
                "selector": "enum",
                "format": ["PascalCase"],
                "custom": {
                    "regex": "^E[A-Z]",
                    "match": true
                }
            },
            {
                "selector": "typeAlias",
                "format": ["PascalCase"]
            }
        ],
        "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
        "no-multiple-empty-lines": ["error", {"max": 1, "maxEOF": 0, "maxBOF": 0}],
        "no-trailing-spaces": "error",
        "block-spacing":"error",
        "eol-last":"error",
        "space-before-blocks": "error",
        "indent": "off",
        "@typescript-eslint/indent": ["error", 4, {
            "SwitchCase": 1,
            "MemberExpression": 1,
            "ArrayExpression": 1,
            "ObjectExpression": 1,
            "ImportDeclaration": 1,
            "flatTernaryExpressions": true,
            "CallExpression": {"arguments": 1},
            "FunctionDeclaration": {"body": 1, "parameters": 1},
            "ignoredNodes": [
                "TSTypeParameterInstantiation",
                "TemplateLiteral *",
                "JSXElement *",
                "JSXElement"
            ]
        }],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],

        "react/boolean-prop-naming": ["error", { "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+" }],
        "react/default-props-match-prop-types": ["error"],
        "react/destructuring-assignment": ["error", "never", { "ignoreClassFields": true }],
        "react/no-access-state-in-setstate": ["error"],
        "react/no-array-index-key": ["error"],
        "react/no-children-prop": ["error"],
        "react/no-danger-with-children": ["error"],
        "react/no-deprecated": ["error"],
        "react/no-direct-mutation-state": ["error"],
        "react/no-find-dom-node": ["error"],
        "react/no-is-mounted": ["error"],
        "react/no-multi-comp": ["error", { "ignoreStateless": true }],
        "react/no-render-return-value": ["error"],
        "react/no-string-refs": ["error"],
        "react/no-unescaped-entities": ["error"],
        "react/no-unknown-property": ["error"],
        "react/no-unstable-nested-components": ["error"],
        "react/no-unused-state": ["error"],
        "react/prefer-read-only-props": ["error"],
        "react/react-in-jsx-scope": ["error"],
        "react/style-prop-object": ["error"],
        "react/void-dom-elements-no-children": ["error"],

        "react/jsx-boolean-value": ["error", "always"],
        "react/jsx-closing-bracket-location": ["error"],
        "react/jsx-closing-tag-location": ["error"],
        "react/jsx-curly-newline": ["error", { "multiline": "consistent", "singleline": "consistent" }],
        "react/jsx-curly-spacing": ["error", {"when": "always", "spacing": {
            "objectLiterals": "never",
            "attributes": true,
            "children": true,
            "allowMultiline": true
        }}],
        "react/jsx-equals-spacing": ["error", "never"],
        "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
        "react/jsx-fragments": ["error", "syntax"],
        "react/jsx-handler-names": ["error", {
            "eventHandlerPrefix": "on",
            "eventHandlerPropPrefix": "handle",
            "checkLocalVariables": true,
            "checkInlineFunction": true
        }],
        "react/jsx-indent": ["error", 4, {
            "checkAttributes": true,
            "indentLogicalExpressions": true
        }],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-key": ["error", { "checkFragmentShorthand": true }],
        "react/jsx-max-props-per-line": ["error", { "maximum": 1, "when": "always" }],
        "react/jsx-no-comment-textnodes": ["error"],
        "react/jsx-no-constructed-context-values": ["error"],
        "react/jsx-no-duplicate-props": ["error", { "ignoreCase": false }],
        "react/jsx-no-target-blank": ["error", {
            "allowReferrer": false,
            "enforceDynamicLinks": "always",
            "links": true,
            "forms": true
        }],
        "react/jsx-no-undef": ["error"],
        "react/jsx-no-useless-fragment": ["error", { "allowExpressions": true }],
        "react/jsx-pascal-case": ["error"],
        "react/jsx-props-no-multi-spaces": ["error"],
        "react/jsx-tag-spacing": ["error", {
            "closingSlash": "never",
            "beforeSelfClosing": "always",
            "afterOpening": "never",
            "beforeClosing": "never"
        }],
        "react/jsx-uses-react": ["error"],
        "react/jsx-uses-vars": ["error"],
        "react/jsx-wrap-multilines": ["error", {
            "declaration": "parens-new-line",
            "assignment": "parens-new-line",
            "return": "parens-new-line",
            "arrow": "parens-new-line",
            "condition": "parens-new-line",
            "logical": "parens-new-line",
            "prop": "parens-new-line"
        }],
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    }
}
