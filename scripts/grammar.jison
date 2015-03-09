/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%s function

%%

\s+                   /* skip whitespace */
"="					/*Ignore Equals*/	
"SUM"											{this.begin("function"); return 'FUNC';}
"AVG"                                           {this.begin("function"); return 'FUNC';}
"MAX"                                           {this.begin("function"); return 'FUNC';}  
"MIN"                                           {this.begin("function"); return 'FUNC';}
[0-9]+("."[0-9]+)?\b  							return 'NUMBER'
"*"                   							return '*'
"/"                   							return '/'
"-"                   							return '-'
"+"                   							return '+'
"^"                   							return '^'
"("                   							return '('
")"                   							return ')'
":"												return ':'
"PI"                  							return 'PI'
"E"                   							return 'E'
<function>[a-zA-Z]+\d*\.[a-zA-Z]+\d*			{console.log(yytext); return 'GlobalCellRange'}
<function>[a-zA-Z]+\d*							{console.log(yytext); return 'LocalCellRange'}
[a-zA-Z]+\d*\.[a-zA-Z]+\d*						return 'GlobalCell'
[a-zA-Z]+\d*									return 'LocalCell'
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
    | '+' e %prec UPLUS				{$$ = $2;}
    | '(' e ')'						{$$ = $2;}
    | NUMBER 						{$$ = Number(yytext);}
    | E 							{$$ = Math.E;}
    | PI							{$$ = Math.PI;}
    | cell                          {$$ = $1;}
    | FUNC '(' range ')'			{$$ = functionWrapper($1,$3);}			
    ;

cell 
	: GlobalCell					{$$ = getCellValue(yytext);}
	| LocalCell						{$$ = getCellValue(yytext);}
	| GlobalCellRange 				{$$ = yytext;}
	| LocalCellRange 				{$$ = yytext;}
	;

range
	: cell ':' cell 				{$$ = $1+$2+$3;this.popstate;}
	;
