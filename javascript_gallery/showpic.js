function addloadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload != 'function'){
		window.onload=func();
	}
	else{
		window.onload=function(){
			oldonload();
			func();
		};
	}
}


/*编写insertAfter()函数*/
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById("imagegallery")) return false; 
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/flower.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("please choose a picture");
	description.appendChild(desctext);
	var body=document.getElementsByTagName("body")[0];
	/*插入的位置不同
	body.appendChild(placeholder);
	body.appendChild(description);
	*/
	
	var gallery=document.getElementById("imagegallery");
	/*用insertBefore()方法插入某元素的前面
	gallery.parentNode.insertBefore(placeholder,gallery);
	gallery.parentNode.insertBefore(description,gallery);
	*/

	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);	

}

function prepareGallery(){
	if(!document.getElementById || !document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			/*当占位元素不存在时，点击链接将按照默认方式打开*/
			return showPic(this)?false:true;
		};
		/*最好不要用onkeypress事件，onclick事件处理函数已经能满足需要
		links[i].onkeypress=links[i].onclick;
		*/
	}
}


function showPic(whichpic){
	    if(!document.getElementById("placeholder")) return false;
		var source=whichpic.getAttribute("href");
		var placeholder=document.getElementById('placeholder');
		if(placeholder.nodeName!='IMG') return false;
		placeholder.setAttribute("src",source);
		if(document.getElementById("description")){
		var text=whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
		var description=document.getElementById("description");
		    if(description.firstChild.nodeType==3){
	    	description.firstChild.nodeValue=text;
	        }
	    }
	    return true;
	}
/*总是给出一个返回值给后面判断是否阻止默认行为*/



addloadEvent(preparePlaceholder);
addloadEvent(prepareGallery);


function countBodyChildren(){
		var body_element=document.getElementsByTagName("body")[0];
		alert(body_element.childNodes.length);
	}




 /*点击链接打开新窗口
window.onload=prepareLinks;
function prepareLinks(){
	if(!getElementsByTagName) return false;
	var links=document.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		if(links[i].getAttribute("class")=="popup"){
			links[i].onclick=function() {
				popup(this.getAttribute("href"));
				return false;
			};
		}
	}
}
function popup(winURL){
	window.open(winURL,"popup","width=320,height=480");
}
*/



