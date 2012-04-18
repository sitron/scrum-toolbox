/*
YUI 3.5.0 (build 5089)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("datatable-body",function(a){var f=a.Lang,g=f.isArray,l=f.isNumber,b=f.isString,k=f.sub,j=a.Escape.html,d=a.Array,h=a.bind,i=a.Object,c=a.ClassNameManager,e=c.getClassName;a.namespace("DataTable").BodyView=a.Base.create("tableBody",a.View,[],{CELL_TEMPLATE:'<td {headers} class="{className}">{content}</td>',ROW_TEMPLATE:'<tr id="{rowId}" data-yui3-record="{clientId}" class="{rowClass}">{content}</tr>',getCell:function(o,n){var q=this.get("container"),s,m,p,r;if(o&&q){if(g(o)){s=q.get("children").item(o[0]);m=s&&s.get("children").item(o[1]);}else{if(a.instanceOf(o,a.Node)){m=o.ancestor("."+this.getClassName("cell"),true);}}if(m&&n){r=q.get("firstChild.rowIndex");if(b(n)){switch(n){case"above":n=[-1,0];break;case"below":n=[1,0];break;case"next":n=[0,1];break;case"previous":n=[0,-1];break;}}if(g(n)){p=m.get("parentNode.rowIndex")+n[0]-r;s=q.get("children").item(p);p=m.get("cellIndex")+n[1];m=s&&s.get("children").item(p);}}}return m||null;},getClassName:function(){var m=d(arguments);m.unshift(this._cssPrefix);m.push(true);return e.apply(c,m);},getRecord:function(n){var p=this.get("modelList"),o=this.get("container"),q=null,m;if(o){if(b(n)){n=o.one("#"+n);}if(a.instanceOf(n,a.Node)){q=n.ancestor(function(r){return r.get("parentNode").compareTo(o);},true);m=q&&p.getByClientId(q.getData("yui3-record"));}}return m||null;},getRow:function(n){var m=this.get("container")||null;if(n){n=this._idMap[n.get?n.get("clientId"):n]||n;}return m&&a.one(l(n)?m.get("children").item(n):"#"+n);},render:function(){var m=this.get("container"),o=this.get("modelList"),n=this.columns;this._createRowTemplate(n);if(m&&o){m.setContent(this._createDataHTML(n));this._applyNodeFormatters(m,n);}this.bindUI();return this;},_afterColumnsChange:function(m){this.columns=this._parseColumns(m.newVal);this.render();},_afterDataChange:function(m){this.render();},_afterModelListChange:function(o){var m=o.prevVal,n=o.newVal;if(m&&m.removeTarget){m.removeTarget(this);}if(n&&n.addTarget(this)){n.addTarget(this);}this._idMap={};},_applyNodeFormatters:function(s,n){var m=this.source,q=this.get("modelList"),p=[],o="."+this.getClassName("liner"),u,r,t;for(r=0,t=n.length;r<t;++r){if(n[r].nodeFormatter){p.push(r);}}if(q&&p.length){u=s.get("childNodes");q.each(function(z,A){var x={data:z.toJSON(),record:z,rowIndex:A},F=u.item(A),y,B,w,D,E,C,v;if(F){E=F.get("childNodes");for(y=0,B=p.length;y<B;++y){C=E.item(p[y]);if(C){w=x.column=n[p[y]];D=w.key||w.id;x.value=z.get(D);x.td=C;x.cell=C.one(o)||C;v=w.nodeFormatter.call(m,x);if(v===false){C.destroy(true);}}}}});}},bindUI:function(){var m=this._eventHandles;if(this.source&&!m.columnsChange){m.columnsChange=this.source.after("columnsChange",h("_afterColumnsChange",this));}if(!m.dataChange){m.dataChange=this.after(["modelListChange","*:change","*:add","*:remove","*:reset"],h("_afterDataChange",this));}},_cssPrefix:c.getClassName("table"),_createDataHTML:function(n){var o=this.get("modelList"),m="";if(o){o.each(function(q,p){m+=this._createRowHTML(q,p);},this);}return m;},_createRowHTML:function(u,w){var s=u.toJSON(),n=u.get("clientId"),y={rowId:this._getRowId(n),clientId:n,rowClass:(w%2)?this.CLASS_ODD:this.CLASS_EVEN},m=this.source||this,q=this.columns,t,v,o,p,x,r;for(t=0,v=q.length;t<v;++t){o=q[t];x=s[o.key];p=o._id;y[p+"-className"]="";if(o.formatter){r={value:x,data:s,column:o,record:u,className:"",rowClass:"",rowIndex:w};if(typeof o.formatter==="string"){if(x!==undefined){x=k(o.formatter,r);}}else{x=o.formatter.call(m,r);if(x===undefined){x=r.value;}y[p+"-className"]=r.className;y.rowClass+=" "+r.rowClass;}}if(x===undefined||x===null||x===""){x=o.emptyCellValue||"";}y[p]=o.allowHTML?x:j(x);y.rowClass=y.rowClass.replace(/\s+/g," ");}return k(this._rowTemplate,y);},_createRowTemplate:function(p){var s="",v=this.CELL_TEMPLATE,r,t,o,u,q,n,m;for(r=0,t=p.length;r<t;++r){o=p[r];u=o.key;q=o._id;n=(o._headers||[]).length>1?'headers="'+o._headers.join(" ")+'"':"";m={content:"{"+q+"}",headers:n,className:this.getClassName("col",q)+" "+(o.className||"")+" "+this.getClassName("cell")+" {"+q+"-className}"};if(o.nodeFormatter){m.content="";}s+=k(o.cellTemplate||v,m);}this._rowTemplate=k(this.ROW_TEMPLATE,{content:s});},destructor:function(){this.set("modelList",null);(new a.EventHandle(i.values(this._eventHandles))).detach();},_getRowId:function(m){return this._idMap[m]||(this._idMap[m]=a.guid());},initializer:function(m){var o=m.cssPrefix||(m.source||{}).cssPrefix,n=this.get("modelList");this.source=m.source;this.columns=this._parseColumns(m.columns);this._eventHandles={};this._idMap={};if(o){this._cssPrefix=o;}this.CLASS_ODD=this.getClassName("odd");this.CLASS_EVEN=this.getClassName("even");this.after("modelListChange",h("_afterModelListChange",this));if(n&&n.addTarget){n.addTarget(this);}},_parseColumns:function(q,p){var n,o,m;p||(p=[]);if(g(q)&&q.length){for(o=0,m=q.length;o<m;++o){n=q[o];if(typeof n==="string"){n={key:n};}if(n.key||n.formatter||n.nodeFormatter){n.index=p.length;p.push(n);}else{if(n.children){this._parseColumns(n.children,p);}}}}return p;}},{ATTRS:{modelList:{setter:"_setModelList"}}});},"3.5.0",{requires:["datatable-core","view","classnamemanager"]});