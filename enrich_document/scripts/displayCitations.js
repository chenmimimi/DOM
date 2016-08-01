//显示文献来源链接表
function displayCitations(){

	var quotes=document.getElementsByTagName("blockquote");

	//遍历找出的所有blockquote标签
	for (var i=0;i<quotes.length;i++){
	
		//若当前的blockquote标签没有cite属性，则直接执行下次循环，不执行后面的句子
		if(!quotes[i].getAttribute("cite")) continue;
		
		//得到cite属性的值
		var url=quotes[i].getAttribute("cite");

		//找出当前blockquote元素下的所有元素标签
		var quoteElements=quotes[i].getElementsByTagName("*");

		//blockquote元素下的最后一个元素标签
		var elem=quoteElements[quoteElements.length-1];

		//创建标记
		var link=document.createElement("a");
		var link_text=document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href",url);

		var superscript=document.createElement("sup");
		superscript.appendChild(link);
		elem.appendChild(superscript);
	}
}
addLoadEvent(displayCitations);