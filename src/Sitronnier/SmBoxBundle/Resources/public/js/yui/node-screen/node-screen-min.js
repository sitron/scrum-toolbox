/*
YUI 3.5.0 (build 5089)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-screen",function(a){a.each(["winWidth","winHeight","docWidth","docHeight","docScrollX","docScrollY"],function(b){a.Node.ATTRS[b]={getter:function(){var c=Array.prototype.slice.call(arguments);c.unshift(a.Node.getDOMNode(this));return a.DOM[b].apply(this,c);}};});a.Node.ATTRS.scrollLeft={getter:function(){var b=a.Node.getDOMNode(this);return("scrollLeft" in b)?b.scrollLeft:a.DOM.docScrollX(b);},setter:function(c){var b=a.Node.getDOMNode(this);if(b){if("scrollLeft" in b){b.scrollLeft=c;}else{if(b.document||b.nodeType===9){a.DOM._getWin(b).scrollTo(c,a.DOM.docScrollY(b));}}}else{}}};a.Node.ATTRS.scrollTop={getter:function(){var b=a.Node.getDOMNode(this);return("scrollTop" in b)?b.scrollTop:a.DOM.docScrollY(b);},setter:function(c){var b=a.Node.getDOMNode(this);if(b){if("scrollTop" in b){b.scrollTop=c;}else{if(b.document||b.nodeType===9){a.DOM._getWin(b).scrollTo(a.DOM.docScrollX(b),c);}}}else{}}};a.Node.importMethod(a.DOM,["getXY","setXY","getX","setX","getY","setY","swapXY"]);a.Node.ATTRS.region={getter:function(){var b=this.getDOMNode(),c;if(b&&!b.tagName){if(b.nodeType===9){b=b.documentElement;}}if(a.DOM.isWindow(b)){c=a.DOM.viewportRegion(b);}else{c=a.DOM.region(b);}return c;}};a.Node.ATTRS.viewportRegion={getter:function(){return a.DOM.viewportRegion(a.Node.getDOMNode(this));}};a.Node.importMethod(a.DOM,"inViewportRegion");a.Node.prototype.intersect=function(b,d){var c=a.Node.getDOMNode(this);if(a.instanceOf(b,a.Node)){b=a.Node.getDOMNode(b);}return a.DOM.intersect(c,b,d);};a.Node.prototype.inRegion=function(b,d,e){var c=a.Node.getDOMNode(this);if(a.instanceOf(b,a.Node)){b=a.Node.getDOMNode(b);}return a.DOM.inRegion(c,b,d,e);};},"3.5.0",{requires:["node-base","dom-screen"]});