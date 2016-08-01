function displayAbbreviations(){
	//检查兼容性
	if(!document.getElementsByTagName|| !document.createElement|| !document.createTextNode) return false;
	var abbreviations=document.getElementsByTagName("abbr");
	if (abbreviations.length<1) return false;

	//定义一个数组存储abbr的文本和缩略文本
	var defs=new Array();

	//遍历abbr标签并将文本和缩略文本存入数组
	for(var i=0;i<abbreviations.length;i++){
		//IE6不认识abbr标签，IE浏览器在统计abbr元素的子节点个数总是返回0；
		if (abbreviations[i].childNodes.length<1) continue;
		var definition=abbreviations[i].getAttribute("title");
		var key=abbreviations[i].firstChild.nodeValue;
		defs[key]=definition;
	}

	//创建dl标签
    var dlist=document.createElement("dl");

	//遍历数组将其键和值分别给key和definition		
	for(var key in defs){

		var definition=defs[key];

	    //创建dt,并将key作为它的文本
		var dtitle=document.createElement("dt");
	    var dtitle_text=document.createTextNode(key);
	    dtitle.appendChild(dtitle_text);
	    //创建dd,并将definition作为它的文本
	    var ddesc=document.createElement("dd");
	    var ddesc_text=document.createTextNode(definition);
	    ddesc.appendChild(ddesc_text);
	    //将dt dd添加到dl
	    dlist.appendChild(dtitle);
	    dlist.appendChild(ddesc);
	}

	    //若dl里面没有任何元素，则立即结束函数
	    if (dlist.childNodes.length<1) return false;
	    //创建标题，内容为abbreviations
	    var header=document.createElement("h2");
	    var header_text=document.createTextNode("abbreviations");
	    header.appendChild(header_text);

	    var body=document.getElementsByTagName("body")[0];

	    //插入标题
	    body.appendChild(header);
	    //插入dl
	    body.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);