function moveElement(elementId,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementId)) return false;
	var elem=document.getElementById(elementId);
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
	    elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	var dist;
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(xpos==final_x && ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		dist=(final_x-xpos)/10;
		xpos+=dist;
	}
	if(xpos>final_x){
		dist=(xpos-final_x)/10;
		xpos-=dist;
	}
	if(ypos<final_y){
		dist=(final_y-ypos)/10;
		ypos+=dist;
	}
	if(ypos>final_y){
		dist=(ypos-final_y)/10;
		ypos-=dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
	//设置为其属性的好处是直接清除movement会报错，那时还没有设置movement变量
	//将movement函数设置为elem的属性，既将第一次的定时器放在elem身上，在下一次开启定时器之前判断是否已有定时器，若有先清除之前的。	
}