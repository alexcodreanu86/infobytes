define("ace/mode/svg",["require","exports","module","pilot/oop","ace/mode/text","ace/mode/javascript","ace/tokenizer","ace/mode/svg_highlight_rules","ace/mode/behaviour/xml"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text").Mode,o=e("ace/mode/javascript").Mode,i=e("ace/tokenizer").Tokenizer,a=e("ace/mode/svg_highlight_rules").SvgHighlightRules,s=e("ace/mode/behaviour/xml").XmlBehaviour,c=function(){this.highlighter=new a,this.$tokenizer=new i(this.highlighter.getRules()),this.$behaviour=new s,this.$embeds=this.highlighter.getEmbeds(),this.createModeDelegates({"js-":o})};n.inherits(c,r),function(){this.toggleCommentLines=function(){return 0},this.getNextLineIndent=function(e,t){return this.$getIndent(t)},this.checkOutdent=function(){return!1}}.call(c.prototype),t.Mode=c}),define("ace/mode/javascript",["require","exports","module","pilot/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text").Mode,o=e("ace/tokenizer").Tokenizer,i=e("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules,a=e("ace/mode/matching_brace_outdent").MatchingBraceOutdent,s=e("ace/range").Range,c=e("ace/worker/worker_client").WorkerClient,g=e("ace/mode/behaviour/cstyle").CstyleBehaviour,l=function(){this.$tokenizer=new o((new i).getRules()),this.$outdent=new a,this.$behaviour=new g};n.inherits(l,r),function(){this.toggleCommentLines=function(e,t,n,r){for(var o=!0,i=/^(\s*)\/\//,a=n;r>=a;a++)if(!i.test(t.getLine(a))){o=!1;break}if(o)for(var c=new s(0,0,0,0),a=n;r>=a;a++){var g=t.getLine(a),l=g.match(i);c.start.row=a,c.end.row=a,c.end.column=l[0].length,t.replace(c,l[1])}else t.indentRows(n,r,"//")},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.$tokenizer.getLineTokens(t,e),i=o.tokens,a=o.state;if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var s=t.match(/^.*[\{\(\[\:]\s*$/);s&&(r+=n)}else if("doc-start"==e){if("start"==a)return"";var s=t.match(/^\s*(\/?)\*/);s&&(s[1]&&(r+=" "),r+="* ")}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=e.getDocument(),n=new c(["ace","pilot"],"worker-javascript.js","ace/mode/javascript_worker","JavaScriptWorker");return n.call("setValue",[t.getValue()]),t.on("change",function(e){e.range={start:e.data.range.start,end:e.data.range.end},n.emit("change",e)}),n.on("jslint",function(t){for(var n=[],r=0;r<t.data.length;r++){var o=t.data[r];o&&n.push({row:o.line-1,column:o.character-1,text:o.reason,type:"warning",lint:o})}e.setAnnotations(n)}),n.on("narcissus",function(t){e.setAnnotations([t.data])}),n.on("terminate",function(){e.clearAnnotations()}),n}}.call(l.prototype),t.Mode=l}),define("ace/mode/javascript_highlight_rules",["require","exports","module","pilot/oop","pilot/lang","ace/unicode","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("pilot/lang"),o=e("ace/unicode"),i=e("ace/mode/doc_comment_highlight_rules").DocCommentHighlightRules,a=e("ace/mode/text_highlight_rules").TextHighlightRules,s=function(){var e=r.arrayToMap("break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|const|yield|import|get|set".split("|")),t=r.arrayToMap("null|Infinity|NaN|undefined".split("|")),n=r.arrayToMap("class|enum|extends|super|export|implements|private|public|interface|package|protected|static".split("|")),a="["+o.packages.L+"\\$_]["+o.packages.L+o.packages.Mn+o.packages.Mc+o.packages.Nd+o.packages.Pc+"\\$_]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},(new i).getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:!0,regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",merge:!0,regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:function(r){return"this"==r?"variable.language":e.hasOwnProperty(r)?"keyword":t.hasOwnProperty(r)?"constant.language":n.hasOwnProperty(r)?"invalid.illegal":"debugger"==r?"invalid.deprecated":"identifier"},regex:a},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)",next:"regex_allowed"},{token:"lparen",regex:"[[({]",next:"regex_allowed"},{token:"rparen",regex:"[\\])}]"},{token:"keyword.operator",regex:"\\/=?",next:"regex_allowed"},{token:"comment",regex:"^#!.*$"},{token:"text",regex:"\\s+"}],regex_allowed:[{token:"string.regexp",regex:"\\/(?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*",next:"start"},{token:"text",regex:"\\s+"},{token:"empty",regex:"",next:"start"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",merge:!0,regex:".+"}]},this.embedRules(i,"doc-",[(new i).getEndRule("start")])};n.inherits(s,a),t.JavaScriptHighlightRules=s}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","pilot/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:!0,regex:"\\s+"},{token:"comment.doc",merge:!0,regex:"TODO"},{token:"comment.doc",merge:!0,regex:"[^@\\*]+"},{token:"comment.doc",merge:!0,regex:"."}]}};n.inherits(o,r),function(){this.getStartRule=function(e){return{token:"comment.doc",merge:!0,regex:"\\/\\*(?=\\*)",next:e}},this.getEndRule=function(e){return{token:"comment.doc",merge:!0,regex:"\\*\\/",next:e}}}.call(o.prototype),t.DocCommentHighlightRules=o}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("ace/range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/worker/worker_client",["require","exports","module","pilot/oop","pilot/event_emitter"],function(e,t){var n=e("pilot/oop"),r=e("pilot/event_emitter").EventEmitter,o=function(t,n,r,o){if(this.callbacks=[],e.packaged){var i=this.$guessBasePath();this.$worker=new Worker(i+n)}else for(var a=this.$normalizePath(e.nameToUrl("ace/worker/worker",null,"_")),s=(this.$worker=new Worker(a),{}),c=0;c<t.length;c++){var g=t[c],l=this.$normalizePath(e.nameToUrl(g,null,"_").replace(/.js$/,""));s[g]=l}this.$worker.postMessage({init:!0,tlns:s,module:r,classname:o}),this.callbackId=1,this.callbacks={};var u=this;this.$worker.onerror=function(e){throw window.console&&console.log&&console.log(e),e},this.$worker.onmessage=function(e){var t=e.data;switch(t.type){case"log":window.console&&console.log&&console.log(t.data);break;case"event":u._dispatchEvent(t.name,{data:t.data});break;case"call":var n=u.callbacks[t.id];n&&(n(t.data),delete u.callbacks[t.id])}}};(function(){n.implement(this,r),this.$normalizePath=function(e){return e.match(/^\w+:/)||(e=location.protocol+"//"+location.host+location.pathname+"/"+e),e},this.$guessBasePath=function(){if(e.aceBaseUrl)return e.aceBaseUrl;for(var t=document.getElementsByTagName("script"),n=0;n<t.length;n++){var r=t[n],o=r.getAttribute("data-ace-base");if(o)return o.replace(/\/*$/,"/");var i=r.src||r.getAttribute("src");if(i){var a=i.match(/^(?:(.*\/)ace\.js|(.*\/)ace-uncompressed\.js)(?:\?|$)/);if(a)return a[1]||a[2]}}return""},this.terminate=function(){this._dispatchEvent("terminate",{}),this.$worker.terminate()},this.send=function(e,t){this.$worker.postMessage({command:e,args:t})},this.call=function(e,t,n){if(n){var r=this.callbackId++;this.callbacks[r]=n,t.push(r)}this.send(e,t)},this.emit=function(e,t){this.$worker.postMessage({event:e,data:t})}}).call(o.prototype),t.WorkerClient=o}),define("ace/mode/behaviour/cstyle",["require","exports","module","pilot/oop","ace/mode/behaviour"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/behaviour").Behaviour,o=function(){this.add("braces","insertion",function(e,t,n,r,o){if("{"==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);return""!==a?{text:"{"+a+"}",selection:!1}:{text:"{}",selection:[1,1]}}if("}"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),g=c.substring(s.column,s.column+1);if("}"==g){var l=r.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==l)return{text:"",selection:[1,1]}}}else if("\n"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),g=c.substring(s.column,s.column+1);if("}"==g){var u=r.findMatchingBracket({row:s.row,column:s.column+1});if(!u)return!1;var h=this.getNextLineIndent(e,c.substring(0,c.length-1),r.getTabString()),d=this.$getIndent(r.doc.getLine(u.row));return{text:"\n"+h+"\n"+d,selection:[1,h.length,1,h.length]}}}return!1}),this.add("braces","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.end.column,o.end.column+1);if("}"==s)return o.end.column++,o}return!1}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);return""!==a?{text:"("+a+")",selection:!1}:{text:"()",selection:[1,1]}}if(")"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),g=c.substring(s.column,s.column+1);if(")"==g){var l=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==l)return{text:"",selection:[1,1]}}}return!1}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(")"==s)return o.end.column++,o}return!1}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a)return{text:'"'+a+'"',selection:!1};var s=n.getCursorPosition(),c=r.doc.getLine(s.row),g=c.substring(s.column-1,s.column);if("\\"==g)return!1;for(var l,u=r.getTokens(i.start.row,i.start.row)[0].tokens,h=0,d=-1,m=0;m<u.length&&(l=u[m],"string"==l.type?d=-1:0>d&&(d=l.value.indexOf('"')),!(l.value.length+h>i.start.column));m++)h+=u[m].value.length;if(!l||0>d&&"comment"!==l.type&&("string"!==l.type||i.start.column!==l.value.length+h-1&&l.value.lastIndexOf('"')===l.value.length-1))return{text:'""',selection:[1,1]};if(l&&"string"===l.type){var x=c.substring(s.column,s.column+1);if('"'==x)return{text:"",selection:[1,1]}}}return!1}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&'"'==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if('"'==s)return o.end.column++,o}return!1})};n.inherits(o,r),t.CstyleBehaviour=o}),define("ace/mode/svg_highlight_rules",["require","exports","module","pilot/oop","ace/mode/javascript_highlight_rules","ace/mode/xml_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/javascript_highlight_rules").JavaScriptHighlightRules,o=e("ace/mode/xml_highlight_rules").XmlHighlightRules,i=function(){o.call(this),this.$rules.start.splice(3,0,{token:"text",regex:"<(?=s*script)",next:"script"}),this.$rules.script=[{token:"text",regex:">",next:"js-start"},{token:"keyword",regex:"[-_a-zA-Z0-9:]+"},{token:"text",regex:"\\s+"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"}],this.embedRules(r,"js-",[{token:"comment",regex:"\\/\\/.*(?=<\\/script>)",next:"tag"},{token:"text",regex:"<\\/(?=script)",next:"tag"}])};n.inherits(i,o),t.SvgHighlightRules=i}),define("ace/mode/xml_highlight_rules",["require","exports","module","pilot/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"text",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",merge:!0,regex:"<\\!--",next:"comment"},{token:"text",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"text",regex:"[^<]+"}],tag:[{token:"text",regex:">",next:"start"},{token:"keyword",regex:"[-_a-zA-Z0-9:]+"},{token:"text",regex:"\\s+"},{token:"string",regex:'".*?"'},{token:"string",merge:!0,regex:'["].*$',next:"qqstring"},{token:"string",regex:"'.*?'"},{token:"string",merge:!0,regex:"['].*$",next:"qstring"}],qstring:[{token:"string",regex:".*'",next:"tag"},{token:"string",merge:!0,regex:".+"}],qqstring:[{token:"string",regex:'.*"',next:"tag"},{token:"string",merge:!0,regex:".+"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",merge:!0,regex:".+"}]}};n.inherits(o,r),t.XmlHighlightRules=o}),define("ace/mode/behaviour/xml",["require","exports","module","pilot/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle"],function(e,t){var n=e("pilot/oop"),r=e("ace/mode/behaviour").Behaviour,o=e("ace/mode/behaviour/cstyle").CstyleBehaviour,i=function(){this.inherit(o,["string_dquotes"]),this.add("brackets","insertion",function(e,t,n,r,o){if("<"==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);return""!==a?!1:{text:"<>",selection:[1,1]}}if(">"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),g=c.substring(s.column,s.column+1);if(">"==g)return{text:"",selection:[1,1]}}else if("\n"==o){var s=n.getCursorPosition(),c=r.doc.getLine(s.row),l=c.substring(s.column,s.column+2);if("</"==l){var u=this.$getIndent(r.doc.getLine(s.row))+r.getTabString(),h=this.$getIndent(r.doc.getLine(s.row));return{text:"\n"+u+"\n"+h,selection:[1,u.length,1,u.length]}}}return!1})};n.inherits(i,r),t.XmlBehaviour=i});