function insertParagraph(text){
	var str="<p>";
	str+=text;
	str+="</p>";
	document.write(text)
}
window.onload=function(){
	/*用innerHTML创建
	var testdiv=document.getElementById("testdiv");
	testdiv.innerHTML="<p>I inserted content.</p>";
	*/

	/*动态创建<p>hello world</p>*/
	var para=document.createElement("p");
	var info="nodeName:";
	info+=para.nodeName;
	info+=" nodeType";
	info+=para.nodeType;
	alert(info);
	var testdiv=document.getElementById("testdiv");
	testdiv.appendChild(para);
	var txt=document.createTextNode("hello world");
	para.appendChild(txt);
	

    var testdiv=document.getElementById("testdiv");
	var para=document.createElement("p");
	var txt1=document.createTextNode("This is");
	var emphasis=document.createElement("em");
	var txt2=document.createTextNode("my");
	var txt3=document.createTextNode("content");
	emphasis.appendChild(txt2);
	para.appendChild(txt1);
	para.appendChild(emphasis);
	para.appendChild(txt3);
	testdiv.appendChild(para);
};