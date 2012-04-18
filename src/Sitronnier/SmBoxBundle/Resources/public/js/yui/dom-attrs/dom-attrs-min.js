/*
YUI 3.5.0 (build 5089)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dom-attrs",function(h){var e=h.config.doc.documentElement,b=h.DOM,a="tagName",g="ownerDocument",c="",f=h.Features.add,d=h.Features.test;h.mix(b,{getText:(e.textContent!==undefined)?function(j){var i="";if(j){i=j.textContent;}return i||"";}:function(j){var i="";if(j){i=j.innerText||j.nodeValue;}return i||"";},setText:(e.textContent!==undefined)?function(i,j){if(i){i.textContent=j;}}:function(i,j){if("innerText" in i){i.innerText=j;}else{if("nodeValue" in i){i.nodeValue=j;}}},CUSTOM_ATTRIBUTES:(!e.hasAttribute)?{"for":"htmlFor","class":"className"}:{"htmlFor":"for","className":"class"},setAttribute:function(k,i,l,j){if(k&&i&&k.setAttribute){i=b.CUSTOM_ATTRIBUTES[i]||i;k.setAttribute(i,l,j);}},getAttribute:function(l,i,k){k=(k!==undefined)?k:2;var j="";if(l&&i&&l.getAttribute){i=b.CUSTOM_ATTRIBUTES[i]||i;j=l.getAttribute(i,k);if(j===null){j="";}}return j;},VALUE_SETTERS:{},VALUE_GETTERS:{},getValue:function(k){var j="",i;if(k&&k[a]){i=b.VALUE_GETTERS[k[a].toLowerCase()];if(i){j=i(k);}else{j=k.value;}}if(j===c){j=c;}return(typeof j==="string")?j:"";},setValue:function(i,j){var k;if(i&&i[a]){k=b.VALUE_SETTERS[i[a].toLowerCase()];if(k){k(i,j);}else{i.value=j;}}},creators:{}});f("value-set","select",{test:function(){var i=h.config.doc.createElement("select");i.innerHTML="<option>1</option><option>2</option>";i.value="2";return(i.value&&i.value==="2");}});if(!d("value-set","select")){b.VALUE_SETTERS.select=function(m,n){for(var k=0,j=m.getElementsByTagName("option"),l;l=j[k++];){if(b.getValue(l)===n){l.selected=true;break;}}};}h.mix(b.VALUE_GETTERS,{button:function(i){return(i.attributes&&i.attributes.value)?i.attributes.value.value:"";}});h.mix(b.VALUE_SETTERS,{button:function(j,k){var i=j.attributes.value;if(!i){i=j[g].createAttribute("value");j.setAttributeNode(i);}i.value=k;}});h.mix(b.VALUE_GETTERS,{option:function(j){var i=j.attributes;return(i.value&&i.value.specified)?j.value:j.text;},select:function(j){var k=j.value,i=j.options;if(i&&i.length){if(j.multiple){}else{k=b.getValue(i[j.selectedIndex]);}}return k;}});},"3.5.0",{requires:["dom-core"]});