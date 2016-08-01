//找出紧跟h1后面的元素并给它样式
function styleHeaderSibling(){
	var headers=document.getElementsByTagName("h1");
	for(var i=0;i<headers.length;i++){

	//找到h1的下一个节点，将其作为参数传入函数，找到元素节点
	var elem=getNextElement(headers[i].nextSibling);

	/*直接更新其style对象来更新样式，这种方法没有做到样式与行为分离
	elem.style.fontWeight="bold";
	elem.style.fontSize="1.2em";
	*/

	//给其添加class来添加样式，若要改变样式只需要改变css
	addClass(elem,"intro");
    }
}



//找到元素节点的函数
function getNextElement(node){
	//若该节点是元素节点，则返回该节点
	if(node.nodeType==1){
		return node;
	}
	//是否有下一个节点，有继续判断下一个节点是否为元素节点
	if(node.nextSibling){
		return getNextElement(node.nextSibling);
	}
	//都不是，则返回空
	return null;
}

function addClass(element,value){
	if(!element.className){
		element.className=value;
	}
	else{
		newClassName=element.className+" "+value;
		element.className=newClassName;
	}
}

function styleElementSiblings(tag,theclass){
	if(!document.getElementsByTagName) return false;
	var elems=document.getElementsByTagName(tag);
	var elem;
	for(var i=0;i<elems.length;i++){
	elem=getNextElement(elems[i].nextSibling);
    addClass(elem,theclass);
    }
}

addLoadEvent(
	function(){
        styleElementSiblings("h1","intro");
   }
);