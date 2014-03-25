define("ace/mode/html",["require","exports","module","pilot/oop","ace/mode/text","ace/mode/javascript","ace/mode/css","ace/tokenizer","ace/mode/html_highlight_rules","ace/mode/behaviour/xml"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text").Mode,o=e("ace/mode/javascript").Mode,i=e("ace/mode/css").Mode,a=e("ace/tokenizer").Tokenizer,s=e("ace/mode/html_highlight_rules").HtmlHighlightRules,c=e("ace/mode/behaviour/xml").XmlBehaviour,l=function(){var e=new s;this.$tokenizer=new a(e.getRules()),this.$behaviour=new c,this.$embeds=e.getEmbeds(),this.createModeDelegates({"js-":o,"css-":i})};n.inherits(l,r),function(){this.toggleCommentLines=function(){return 0},this.getNextLineIndent=function(e,t){return this.$getIndent(t)},this.checkOutdent=function(){return!1}}.call(l.prototype),t.Mode=l}),define("ace/mode/javascript",["require","exports","module","pilot/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text").Mode,o=e("ace/tokenizer").Tokenizer,i=e("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules,a=e("ace/mode/matching_brace_outdent").MatchingBraceOutdent,s=e("ace/range").Range,c=e("ace/worker/worker_client").WorkerClient,l=e("ace/mode/behaviour/cstyle").CstyleBehaviour,g=function(){this.$tokenizer=new o((new i).getRules()),this.$outdent=new a,this.$behaviour=new l};n.inherits(g,r),function(){this.toggleCommentLines=function(e,t,n,r){for(var o=!0,i=/^(\s*)\/\//,a=n;r>=a;a++)if(!i.test(t.getLine(a))){o=!1;break}if(o)for(var c=new s(0,0,0,0),a=n;r>=a;a++){var l=t.getLine(a),g=l.match(i);c.start.row=a,c.end.row=a,c.end.column=g[0].length,t.replace(c,g[1])}else t.indentRows(n,r,"//")},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.$tokenizer.getLineTokens(t,e),i=o.tokens,a=o.state;if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var s=t.match(/^.*[\{\(\[\:]\s*$/);s&&(r+=n)}else if("doc-start"==e){if("start"==a)return"";var s=t.match(/^\s*(\/?)\*/);s&&(s[1]&&(r+=" "),r+="* ")}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=e.getDocument(),n=new c(["ace","pilot"],"worker-javascript.js","ace/mode/javascript_worker","JavaScriptWorker");return n.call("setValue",[t.getValue()]),t.on("change",function(e){e.range={start:e.data.range.start,end:e.data.range.end},n.emit("change",e)}),n.on("jslint",function(t){for(var n=[],r=0;r<t.data.length;r++){var o=t.data[r];o&&n.push({row:o.line-1,column:o.character-1,text:o.reason,type:"warning",lint:o})}e.setAnnotations(n)}),n.on("narcissus",function(t){e.setAnnotations([t.data])}),n.on("terminate",function(){e.clearAnnotations()}),n}}.call(g.prototype),t.Mode=g}),define("ace/mode/javascript_highlight_rules",["require","exports","module","pilot/oop","pilot/lang","ace/unicode","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("pilot/lang"),o=e("ace/unicode"),i=e("ace/mode/doc_comment_highlight_rules").DocCommentHighlightRules,a=e("ace/mode/text_highlight_rules").TextHighlightRules,s=function(){var e=r.arrayToMap("break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|const|yield|import|get|set".split("|")),t=r.arrayToMap("null|Infinity|NaN|undefined".split("|")),n=r.arrayToMap("class|enum|extends|super|export|implements|private|public|interface|package|protected|static".split("|")),a="["+o.packages.L+"\\$_]["+o.packages.L+o.packages.Mn+o.packages.Mc+o.packages.Nd+o.packages.Pc+"\\$_]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},(new i).getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:!0,regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",merge:!0,regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:function(r){return"this"==r?"variable.language":e.hasOwnProperty(r)?"keyword":t.hasOwnProperty(r)?"constant.language":n.hasOwnProperty(r)?"invalid.illegal":"debugger"==r?"invalid.deprecated":"identifier"},regex:a},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)",next:"regex_allowed"},{token:"lparen",regex:"[[({]",next:"regex_allowed"},{token:"rparen",regex:"[\\])}]"},{token:"keyword.operator",regex:"\\/=?",next:"regex_allowed"},{token:"comment",regex:"^#!.*$"},{token:"text",regex:"\\s+"}],regex_allowed:[{token:"string.regexp",regex:"\\/(?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*",next:"start"},{token:"text",regex:"\\s+"},{token:"empty",regex:"",next:"start"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",merge:!0,regex:".+"}]},this.embedRules(i,"doc-",[(new i).getEndRule("start")])};n.inherits(s,a),t.JavaScriptHighlightRules=s}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","pilot/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};n.inherits(o,r),function(){this.getStartRule=function(e){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:e}},this.getEndRule=function(e){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:e}}}.call(o.prototype),t.DocCommentHighlightRules=o}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("ace/range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/worker/worker_client",["require","exports","module","pilot/oop","pilot/event_emitter"],function(e,t){var n=e("pilot/oop"),r=e("pilot/event_emitter").EventEmitter,o=function(t,n,r,o){if(this.callbacks=[],e.packaged){var i=this.$guessBasePath();this.$worker=new Worker(i+n)}else for(var a=this.$normalizePath(e.nameToUrl("ace/worker/worker",null,"_")),s=(this.$worker=new Worker(a),{}),c=0;c<t.length;c++){var l=t[c],g=this.$normalizePath(e.nameToUrl(l,null,"_").replace(/.js$/,""));s[l]=g}this.$worker.postMessage({init:!0,tlns:s,module:r,classname:o}),this.callbackId=1,this.callbacks={};var u=this;this.$worker.onerror=function(e){throw window.console&&console.log&&console.log(e),e},this.$worker.onmessage=function(e){var t=e.data;switch(t.type){case"log":window.console&&console.log&&console.log(t.data);break;case"event":u._dispatchEvent(t.name,{data:t.data});break;case"call":var n=u.callbacks[t.id];n&&(n(t.data),delete u.callbacks[t.id])}}};(function(){n.implement(this,r),this.$normalizePath=function(e){return e.match(/^\w+:/)||(e=location.protocol+"//"+location.host+location.pathname+"/"+e),e},this.$guessBasePath=function(){if(e.aceBaseUrl)return e.aceBaseUrl;for(var t=document.getElementsByTagName("script"),n=0;n<t.length;n++){var r=t[n],o=r.getAttribute("data-ace-base");if(o)return o.replace(/\/*$/,"/");var i=r.src||r.getAttribute("src");if(i){var a=i.match(/^(?:(.*\/)ace\.js|(.*\/)ace-uncompressed\.js)(?:\?|$)/);if(a)return a[1]||a[2]}}return""},this.terminate=function(){this._dispatchEvent("terminate",{}),this.$worker.terminate()},this.send=function(e,t){this.$worker.postMessage({command:e,args:t})},this.call=function(e,t,n){if(n){var r=this.callbackId++;this.callbacks[r]=n,t.push(r)}this.send(e,t)},this.emit=function(e,t){this.$worker.postMessage({event:e,data:t})}}).call(o.prototype),t.WorkerClient=o}),define("ace/mode/behaviour/cstyle",["require","exports","module","pilot/oop","ace/mode/behaviour"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/behaviour").Behaviour,o=function(){this.add("braces","insertion",function(e,t,n,r,o){if("{"==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);return""!==a?{text:"{"+a+"}",selection:!1}:{text:"{}",selection:[1,1]}}if("}"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),l=c.substring(s.column,s.column+1);if("}"==l){var g=r.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==g)return{text:"",selection:[1,1]}}}else if("\n"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),l=c.substring(s.column,s.column+1);if("}"==l){var u=r.findMatchingBracket({row:s.row,column:s.column+1});if(!u)return!1;var d=this.getNextLineIndent(e,c.substring(0,c.length-1),r.getTabString()),h=this.$getIndent(r.doc.getLine(u.row));return{text:"\n"+d+"\n"+h,selection:[1,d.length,1,d.length]}}}return!1}),this.add("braces","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.end.column,o.end.column+1);if("}"==s)return o.end.column++,o}return!1}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);return""!==a?{text:"("+a+")",selection:!1}:{text:"()",selection:[1,1]}}if(")"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),l=c.substring(s.column,s.column+1);if(")"==l){var g=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==g)return{text:"",selection:[1,1]}}}return!1}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(")"==s)return o.end.column++,o}return!1}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a)return{text:'"'+a+'"',selection:!1};var s=n.getCursorPosition(),c=r.doc.getLine(s.row),l=c.substring(s.column-1,s.column);if("\\"==l)return!1;for(var g,u=r.getTokens(i.start.row,i.start.row)[0].tokens,d=0,h=-1,m=0;m<u.length&&(g=u[m],"string"==g.type?h=-1:0>h&&(h=g.value.indexOf('"')),!(g.value.length+d>i.start.column));m++)d+=u[m].value.length;if(!g||0>h&&"comment"!==g.type&&("string"!==g.type||i.start.column!==g.value.length+d-1&&g.value.lastIndexOf('"')===g.value.length-1))return{text:'""',selection:[1,1]};if(g&&"string"===g.type){var p=c.substring(s.column,s.column+1);if('"'==p)return{text:"",selection:[1,1]}}}return!1}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&'"'==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if('"'==s)return o.end.column++,o}return!1})};n.inherits(o,r),t.CstyleBehaviour=o}),define("ace/mode/css",["require","exports","module","pilot/oop","ace/mode/text","ace/tokenizer","ace/mode/css_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text").Mode,o=e("ace/tokenizer").Tokenizer,i=e("ace/mode/css_highlight_rules").CssHighlightRules,a=e("ace/mode/matching_brace_outdent").MatchingBraceOutdent,s=e("ace/worker/worker_client").WorkerClient,c=function(){this.$tokenizer=new o((new i).getRules()),this.$outdent=new a};n.inherits(c,r),function(){this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.$tokenizer.getLineTokens(t,e).tokens;if(o.length&&"comment"==o[o.length-1].type)return r;var i=t.match(/^.*\{\s*$/);return i&&(r+=n),r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=e.getDocument(),n=new s(["ace","pilot"],"worker-css.js","ace/mode/css_worker","Worker");n.call("setValue",[t.getValue()]),t.on("change",function(e){e.range={start:e.data.range.start,end:e.data.range.end},n.emit("change",e)}),n.on("csslint",function(t){var n=[];t.data.forEach(function(e){n.push({row:e.line-1,column:e.col-1,text:e.message,type:e.type,lint:e})}),e.setAnnotations(n)})}}.call(c.prototype),t.Mode=c}),define("ace/mode/css_highlight_rules",["require","exports","module","pilot/oop","pilot/lang","ace/mode/text_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("pilot/lang"),o=e("ace/mode/text_highlight_rules").TextHighlightRules,i=function(){function e(e){for(var t=[],n=e.split(""),r=0;r<n.length;r++)t.push("[",n[r].toLowerCase(),n[r].toUpperCase(),"]");return t.join("")}var t=r.arrayToMap("-moz-box-sizing|-webkit-box-sizing|appearance|azimuth|background-attachment|background-color|background-image|background-position|background-repeat|background|border-bottom-color|border-bottom-style|border-bottom-width|border-bottom|border-collapse|border-color|border-left-color|border-left-style|border-left-width|border-left|border-right-color|border-right-style|border-right-width|border-right|border-spacing|border-style|border-top-color|border-top-style|border-top-width|border-top|border-width|border|bottom|box-sizing|caption-side|clear|clip|color|content|counter-increment|counter-reset|cue-after|cue-before|cue|cursor|direction|display|elevation|empty-cells|float|font-family|font-size-adjust|font-size|font-stretch|font-style|font-variant|font-weight|font|height|left|letter-spacing|line-height|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|marker-offset|margin|marks|max-height|max-width|min-height|min-width|-moz-border-radius|opacity|orphans|outline-color|outline-style|outline-width|outline|overflow|overflow-x|overflow-y|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page|pause-after|pause-before|pause|pitch-range|pitch|play-during|position|quotes|richness|right|size|speak-header|speak-numeral|speak-punctuation|speech-rate|speak|stress|table-layout|text-align|text-decoration|text-indent|text-shadow|text-transform|top|unicode-bidi|vertical-align|visibility|voice-family|volume|white-space|widows|width|word-spacing|z-index".split("|")),n=r.arrayToMap("rgb|rgba|url|attr|counter|counters".split("|")),o=r.arrayToMap("absolute|all-scroll|always|armenian|auto|baseline|below|bidi-override|block|bold|bolder|border-box|both|bottom|break-all|break-word|capitalize|center|char|circle|cjk-ideographic|col-resize|collapse|content-box|crosshair|dashed|decimal-leading-zero|decimal|default|disabled|disc|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ellipsis|fixed|georgian|groove|hand|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|inactive|inherit|inline-block|inline|inset|inside|inter-ideograph|inter-word|italic|justify|katakana-iroha|katakana|keep-all|left|lighter|line-edge|line-through|line|list-item|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|medium|middle|move|n-resize|ne-resize|newspaper|no-drop|no-repeat|nw-resize|none|normal|not-allowed|nowrap|oblique|outset|outside|overline|pointer|progress|relative|repeat-x|repeat-y|repeat|right|ridge|row-resize|rtl|s-resize|scroll|se-resize|separate|small-caps|solid|square|static|strict|super|sw-resize|table-footer-group|table-header-group|tb-rl|text-bottom|text-top|text|thick|thin|top|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|zero".split("|")),i=r.arrayToMap("aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow".split("|")),a="\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))",s=[{token:"comment",merge:!0,regex:"\\/\\*",next:"ruleset_comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:a+e("em")},{token:"constant.numeric",regex:a+e("ex")},{token:"constant.numeric",regex:a+e("px")},{token:"constant.numeric",regex:a+e("cm")},{token:"constant.numeric",regex:a+e("mm")},{token:"constant.numeric",regex:a+e("in")},{token:"constant.numeric",regex:a+e("pt")},{token:"constant.numeric",regex:a+e("pc")},{token:"constant.numeric",regex:a+e("deg")},{token:"constant.numeric",regex:a+e("rad")},{token:"constant.numeric",regex:a+e("grad")},{token:"constant.numeric",regex:a+e("ms")},{token:"constant.numeric",regex:a+e("s")},{token:"constant.numeric",regex:a+e("hz")},{token:"constant.numeric",regex:a+e("khz")},{token:"constant.numeric",regex:a+"%"},{token:"constant.numeric",regex:a},{token:"constant.numeric",regex:"#[a-fA-F0-9]{6}"},{token:"constant.numeric",regex:"#[a-fA-F0-9]{3}"},{token:function(e){return t.hasOwnProperty(e.toLowerCase())?"support.type":n.hasOwnProperty(e.toLowerCase())?"support.function":o.hasOwnProperty(e.toLowerCase())?"support.constant":i.hasOwnProperty(e.toLowerCase())?"support.constant.color":"text"},regex:"\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"}],c=r.copyArray(s);c.unshift({token:"rparen",regex:"\\}",next:"start"});var l=r.copyArray(s);l.unshift({token:"rparen",regex:"\\}",next:"media"});var g=[{token:"comment",merge:!0,regex:".+"}],u=r.copyArray(g);u.unshift({token:"comment",regex:".*?\\*\\/",next:"start"});var d=r.copyArray(g);d.unshift({token:"comment",regex:".*?\\*\\/",next:"media"});var h=r.copyArray(g);h.unshift({token:"comment",regex:".*?\\*\\/",next:"ruleset"}),this.$rules={start:[{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"lparen",regex:"\\{",next:"ruleset"},{token:"string",regex:"@media.*?{",next:"media"},{token:"keyword",regex:"#[a-zA-Z0-9-_]+"},{token:"variable",regex:"\\.[a-zA-Z0-9-_]+"},{token:"string",regex:":[a-zA-Z0-9-_]+"},{token:"constant",regex:"[a-zA-Z0-9-_]+"}],media:[{token:"comment",merge:!0,regex:"\\/\\*",next:"media_comment"},{token:"lparen",regex:"\\{",next:"media_ruleset"},{token:"string",regex:"\\}",next:"start"},{token:"keyword",regex:"#[a-zA-Z0-9-_]+"},{token:"variable",regex:"\\.[a-zA-Z0-9-_]+"},{token:"string",regex:":[a-zA-Z0-9-_]+"},{token:"constant",regex:"[a-zA-Z0-9-_]+"}],comment:u,ruleset:c,ruleset_comment:h,media_ruleset:l,media_comment:d}};n.inherits(i,o),t.CssHighlightRules=i}),define("ace/mode/html_highlight_rules",["require","exports","module","pilot/oop","ace/mode/css_highlight_rules","ace/mode/javascript_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/css_highlight_rules").CssHighlightRules,o=e("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules,i=e("ace/mode/text_highlight_rules").TextHighlightRules,a=function(){function e(e,t){return[{token:"string",merge:!0,regex:".*"+e,next:t},{token:"string",merge:!0,regex:".+"}]}function t(e){return[{token:"string",regex:'".*?"'},{token:"string",merge:!0,regex:'["].*$',next:e+"-qqstring"},{token:"string",regex:"'.*?'"},{token:"string",merge:!0,regex:"['].*$",next:e+"-qstring"}]}this.$rules={start:[{token:"text",merge:!0,regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",merge:!0,regex:"<\\!--",next:"comment"},{token:"text",regex:"<(?=s*script)",next:"script"},{token:"text",regex:"<(?=s*style)",next:"css"},{token:"text",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"text",regex:"[^<]+"}],script:[{token:"text",regex:">",next:"js-start"},{token:"keyword",regex:"[-_a-zA-Z0-9:]+"},{token:"text",regex:"\\s+"}].concat(t("script")),css:[{token:"text",regex:">",next:"css-start"},{token:"keyword",regex:"[-_a-zA-Z0-9:]+"},{token:"text",regex:"\\s+"}].concat(t("style")),tag:[{token:"text",regex:">",next:"start"},{token:"keyword",regex:"[-_a-zA-Z0-9:]+"},{token:"text",regex:"\\s+"}].concat(t("tag")),"style-qstring":e("'","style"),"style-qqstring":e('"',"style"),"script-qstring":e("'","script"),"script-qqstring":e('"',"script"),"tag-qstring":e("'","tag"),"tag-qqstring":e('"',"tag"),cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",merge:!0,regex:"\\s+"},{token:"text",merge:!0,regex:".+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",merge:!0,regex:".+"}]},this.embedRules(o,"js-",[{token:"comment",regex:"\\/\\/.*(?=<\\/script>)",next:"tag"},{token:"text",regex:"<\\/(?=script)",next:"tag"}]),this.embedRules(r,"css-",[{token:"text",regex:"<\\/(?=style)",next:"tag"}])};n.inherits(a,i),t.HtmlHighlightRules=a}),define("ace/mode/behaviour/xml",["require","exports","module","pilot/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/behaviour").Behaviour,o=e("ace/mode/behaviour/cstyle").CstyleBehaviour,i=function(){this.inherit(o,["string_dquotes"]),this.add("brackets","insertion",function(e,t,n,r,o){if("<"==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);return""!==a?!1:{text:"<>",selection:[1,1]}}if(">"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),l=c.substring(s.column,s.column+1);if(">"==l)return{text:"",selection:[1,1]}}else if("\n"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),g=c.substring(s.column,s.column+2);if("</"==g){var u=this.$getIndent(r.doc.getLine(s.row))+r.getTabString(),d=this.$getIndent(r.doc.getLine(s.row));return{text:"\n"+u+"\n"+d,selection:[1,u.length,1,u.length]}}}return!1})};n.inherits(i,r),t.XmlBehaviour=i});