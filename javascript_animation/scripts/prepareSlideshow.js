function prepareSlideshow(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;

	//创建div和img元素，以防止用户没有启用js
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview=document.createElement("img");
	preview.setAttribute("src","topics.gif");
	preview.setAttribute("alt","building blocks of web design");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);	

	var list=document.getElementById("linklist");
	insertAfter(slideshow,list);

	var links=list.getElementsByTagName("a");
	links[0].onmouseover=function(){
		moveElement("preview",0,0,8);
	};
	links[1].onmouseover=function(){
		moveElement("preview",-100,0,8);
	};
	links[2].onmouseover=function(){
		moveElement("preview",-200,0,8);
	};
}


addLoadEvent(prepareSlideshow);