function displayAccessKeys(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	var links=document.getElementsByTagName("a");
	var akeys=new Array();
	//将accesskey text保存到数组akeys中
	for(var i=0;i<links.length;i++){
		if(!links[i].getAttribute("accesskey")) continue;
		var key=links[i].getAttribute("accesskey");
		var text=links[i].lastChild.nodeValue;
		akeys[key]=text;
	}
var list=document.createElement("ul");
	for(key in akeys){
	    var text=akeys[key];
	    var str=key+":"+text;
	    var items=document.createElement("li");
	    var items_text=document.createTextNode(str)
	    items.appendChild(items_text);
	    list.appendChild(items);
	}
var header=document.createElement("h3");
var header_text=document.createTextNode("Accesskey")
header.appendChild(header_text);
document.body.appendChild(header);
document.body.appendChild(list);
}
addLoadEvent(displayAccessKeys);