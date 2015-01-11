/**
 * Created by Luke on 10/01/2015.
 */

var Parser = require("jison").Parser;

var grammar = {
    "lex": {
        "rules": [
            ["\\s+",        "/* skip whitespace */"],
            ["=",           "/* ignore equals sign*/"],
            ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'Number';"],
            ["\\*",                     "return '*';"],
            ["\\/",                     "return '/';"],
            ["-",                       "return '-';"],
            ["\\+",                     "return '+';"],
            ["\\^",                     "return '^';"],
            ["\\(",                     "return '(';"],
            ["\\)",                     "return ')';"],
            ["[a-zA-Z]+\\d*\\.[a-zA-Z]+\\d*","return 'GlobalCell';"],
            ["[a-zA-Z]+\\d*","return 'LocalCell';"],
            ["$",                       "return 'EOF';"]

        ]
    },

    "operators": [
        ["left", "+", "-"],
        ["left", "*", "/"],
        ["left", "^"],
        ["left", "UnaryMinus"],
        ["left", "UnaryPlus"]
    ],

    "bnf": {
        "expressions" :[[ "e EOF",   "return $1;"  ]],

        "e" :[[ "e + e", "$$ = calculateWrapper('+',$1,$3);"],
            ["e - e", "$$ = calculateWrapper('-',$1,$3);"],
            ["e * e", "$$ = calculateWrapper('*',$1,$3);"],
            ["e / e", "$$ = calculateWrapper('/',$1,$3);"],
            ["e ^ e", "$$ = calculateWrapper('^',$1,$3);"],
            ["- e", "$$ = -$2;", {"prec": "UnaryMinus"}],
            ["+ e", "$$ = $2;", {"prec": "UnaryPlus"}],
            ["( e )", "$$ = $2;"],
            ["Number", "$$ = Number(yytext);"],
            ["GlobalCell", "$$ = getCellValue(yytext);"],
            ["LocalCell", "$$ = getCellValue(yytext);"]]
    }
};

var parser = new Parser(grammar);

// generate source, ready to be written to disk
var parserSource = parser.generate();

// you can also use the parser directly from memory

console.log(parser.parse("B1+B2"));
// returns true

