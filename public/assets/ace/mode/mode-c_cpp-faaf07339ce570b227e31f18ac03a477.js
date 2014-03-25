define("ace/mode/c_cpp",["require","exports","module","pilot/oop","ace/mode/text","ace/tokenizer","ace/mode/c_cpp_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text").Mode,o=e("ace/tokenizer").Tokenizer,i=e("ace/mode/c_cpp_highlight_rules").c_cppHighlightRules,c=e("ace/mode/matching_brace_outdent").MatchingBraceOutdent,a=e("ace/range").Range,s=e("ace/mode/behaviour/cstyle").CstyleBehaviour,u=function(){this.$tokenizer=new o((new i).getRules()),this.$outdent=new c,this.$behaviour=new s};n.inherits(u,r),function(){this.toggleCommentLines=function(e,t,n,r){for(var o=!0,i=/^(\s*)\/\//,c=n;r>=c;c++)if(!i.test(t.getLine(c))){o=!1;break}if(o)for(var s=new a(0,0,0,0),c=n;r>=c;c++){var u=t.getLine(c),g=u.match(i);s.start.row=c,s.end.row=c,s.end.column=g[0].length,t.replace(s,g[1])}else t.indentRows(n,r,"//")},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.$tokenizer.getLineTokens(t,e),i=o.tokens,c=o.state;if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var a=t.match(/^.*[\{\(\[]\s*$/);a&&(r+=n)}else if("doc-start"==e){if("start"==c)return"";var a=t.match(/^\s*(\/?)\*/);a&&(a[1]&&(r+=" "),r+="* ")}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)}}.call(u.prototype),t.Mode=u}),define("ace/mode/c_cpp_highlight_rules",["require","exports","module","pilot/oop","pilot/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("pilot/lang"),o=e("ace/mode/doc_comment_highlight_rules").DocCommentHighlightRules,i=e("ace/mode/text_highlight_rules").TextHighlightRules,c=function(){var e=r.arrayToMap("and|double|not_eq|throw|and_eq|dynamic_cast|operator|true|asm|else|or|try|auto|enum|or_eq|typedef|bitand|explicit|private|typeid|bitor|extern|protected|typename|bool|false|public|union|break|float|register|unsigned|case|fro|reinterpret-cast|using|catch|friend|return|virtual|char|goto|short|void|class|if|signed|volatile|compl|inline|sizeof|wchar_t|const|int|static|while|const-cast|long|static_cast|xor|continue|mutable|struct|xor_eq|default|namespace|switch|delete|new|template|do|not|this|for".split("|")),t=r.arrayToMap("NULL".split("|"));this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},(new o).getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:!0,regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",merge:!0,regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant",regex:"<[a-zA-Z0-9.]+>"},{token:"keyword",regex:"(?:#include|#pragma|#line|#define|#undef|#ifdef|#else|#elif|#endif|#ifndef)"},{token:function(n){return"this"==n?"variable.language":e.hasOwnProperty(n)?"keyword":t.hasOwnProperty(n)?"constant.language":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",merge:!0,regex:".+"}]},this.embedRules(o,"doc-",[(new o).getEndRule("start")])};n.inherits(c,i),t.c_cppHighlightRules=c}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","pilot/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};n.inherits(o,r),function(){this.getStartRule=function(e){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:e}},this.getEndRule=function(e){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:e}}}.call(o.prototype),t.DocCommentHighlightRules=o}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("ace/range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,c=e.findMatchingBracket({row:t,column:i});if(!c||c.row==t)return 0;var a=this.$getIndent(e.getLine(c.row));e.replace(new n(t,0,t,i-1),a)},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/mode/behaviour/cstyle",["require","exports","module","pilot/oop","ace/mode/behaviour"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/behaviour").Behaviour,o=function(){this.add("braces","insertion",function(e,t,n,r,o){if("{"==o){var i=n.getSelectionRange(),c=r.doc.getTextRange(i);return""!==c?{text:"{"+c+"}",selection:!1}:{text:"{}",selection:[1,1]}}if("}"==o){var a=n.getCursorPosition(),s=r.doc.getLine(a.row),u=s.substring(a.column,a.column+1);if("}"==u){var g=r.$findOpeningBracket("}",{column:a.column+1,row:a.row});if(null!==g)return{text:"",selection:[1,1]}}}else if("\n"==o){var a=n.getCursorPosition(),s=r.doc.getLine(a.row),u=s.substring(a.column,a.column+1);if("}"==u){var l=r.findMatchingBracket({row:a.row,column:a.column+1});if(!l)return!1;var d=this.getNextLineIndent(e,s.substring(0,s.length-1),r.getTabString()),m=this.$getIndent(r.doc.getLine(l.row));return{text:"\n"+d+"\n"+m,selection:[1,d.length,1,d.length]}}}return!1}),this.add("braces","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){var c=r.doc.getLine(o.start.row),a=c.substring(o.end.column,o.end.column+1);if("}"==a)return o.end.column++,o}return!1}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){var i=n.getSelectionRange(),c=r.doc.getTextRange(i);return""!==c?{text:"("+c+")",selection:!1}:{text:"()",selection:[1,1]}}if(")"==o){var a=n.getCursorPosition(),s=r.doc.getLine(a.row),u=s.substring(a.column,a.column+1);if(")"==u){var g=r.$findOpeningBracket(")",{column:a.column+1,row:a.row});if(null!==g)return{text:"",selection:[1,1]}}}return!1}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){var c=r.doc.getLine(o.start.row),a=c.substring(o.start.column+1,o.start.column+2);if(")"==a)return o.end.column++,o}return!1}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o){var i=n.getSelectionRange(),c=r.doc.getTextRange(i);if(""!==c)return{text:'"'+c+'"',selection:!1};var a=n.getCursorPosition(),s=r.doc.getLine(a.row),u=s.substring(a.column-1,a.column);if("\\"==u)return!1;for(var g,l=r.getTokens(i.start.row,i.start.row)[0].tokens,d=0,m=-1,h=0;h<l.length&&(g=l[h],"string"==g.type?m=-1:0>m&&(m=g.value.indexOf('"')),!(g.value.length+d>i.start.column));h++)d+=l[h].value.length;if(!g||0>m&&"comment"!==g.type&&("string"!==g.type||i.start.column!==g.value.length+d-1&&g.value.lastIndexOf('"')===g.value.length-1))return{text:'""',selection:[1,1]};if(g&&"string"===g.type){var f=s.substring(a.column,a.column+1);if('"'==f)return{text:"",selection:[1,1]}}}return!1}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&'"'==i){var c=r.doc.getLine(o.start.row),a=c.substring(o.start.column+1,o.start.column+2);if('"'==a)return o.end.column++,o}return!1})};n.inherits(o,r),t.CstyleBehaviour=o});