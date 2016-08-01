function positionMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem=document.getElementById("message");
	elem.style.position="absolute";
	
	elem.style.left="10px";
	elem.style.top="10px";

	moment=setTimeout("moveElement('message',600,600,10)",4000);

	if(!document.getElementById("message2")) return false;
	var elem2=document.getElementById("message2");
	elem2.style.position="absolute";
	elem2.style.left="60px";
	elem2.style.top="10px";
	moment2=setTimeout("moveElement('message2',650,600,10)",4000);


}

function moveMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem=document.getElementById("message");
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==500 && ypos==100){
		return true;
	}
	if(xpos<500){
		xpos++;
	}
	if(xpos>500){
		xpos--;
	}
	if(ypos<100){
		ypos++;
	}
	if(ypos>100){
		ypos--;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	movement=setTimeout("moveMessage()",10);
}


addLoadEvent(positionMessage());
