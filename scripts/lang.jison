/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  							return 'NUMBER'
"*"                   							return '*'
"/"                   							return '/'
"-"                   							return '-'
"+"                   							return '+'
"^"                   							return '^'
"("                   							return '('
")"                   							return ')'
"PI"                  							return 'PI'
"E"                   							return 'E'
"[a-zA-Z]+\\d*\\.[a-zA-Z]+\\d*"					return 'GlobalCell'
"[a-zA-Z]+\\d*"									return 'LocalCell'
<<EOF>>               							return 'EOF'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS
%left UPLUS

%start expressions

%% /* language grammar */

expressions
    : e EOF 						{return $1;}
    ;

e
    : e '+' e 						{$$ = calculateWrapper('+',$1,$3);}
    | e '-' e 						{$$ = calculateWrapper('-',$1,$3);}
    | e '*' e 						{$$ = calculateWrapper('*',$1,$3);}
    | e '/' e 						{$$ = calculateWrapper('/',$1,$3);}
    | e '^' e 						{$$ = calculateWrapper('^',$1,$3);}
    | '-' e %prec UMINUS			{$$ = -$2;}
    | '(' e ')'						{$$ = $2;}
    | NUMBER 						{$$ = Number(yytext);}
    | E 							{$$ = Math.E;}
    | PI							{$$ = Math.PI;}
    ;
