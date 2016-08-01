//addLoadEvent()函数
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!="function"){
		window.onload=func;
	}
	else{
		window.onload=function(){
			oldonload();
			func();
		};
	}
}

//insertAfter()函数
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//addClass()函数
function addClass(element,value){
	if(!element.className){
		element.className=value;
	}
	else{
		var newClassName=element.className+" "+value;
		element.className=newClassName;
	}
}

//moveElement()函数
function moveElement(elementId,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementId)) return false;
	var elem=document.getElementById(elementId);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		var dist=Math.ceil((final_x-xpos)/10);
		xpos+=dist;
	}
	if(xpos>final_x){
		var dist=Math.ceil((xpos-final_x)/10);
		xpos-=dist;
	}
	if(ypos<final_y){
		var dist=Math.ceil((final_y-ypos)/10);
		ypos+=dist;
	}
	if(ypos>final_y){
		var dist=Math.ceil((ypos-final_y)/10);
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}


//当前页面的连接高亮并且给当前页面的body不同的id从而给其不同的样式，通过ID选择器
function highLightPage(){
	if(!document.getElementsByTagName) return false;
	var header=document.getElementsByTagName("header");
	if(header.length==0) return false;
	var nav=header[0].getElementsByTagName("nav");
	if(nav.length==0) return false;
	var links=nav[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++){
		linkurl=links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!=-1){
			addClass(links[i],"here");
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
addLoadEvent(highLightPage);


//用DOM方法创建幻灯片效果
function prepareSlideshow(){

	//创建幻灯片需要的slideshow(div),preview(img),并将其添加至相应的位置
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro=document.getElementById("intro");
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview=document.createElement("img");
	preview.setAttribute("id","preview");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);

	//创建一个小窗的img，图片是一个圆形的框，将其放在slideshow中
	var frame=document.createElement("img");
	frame.setAttribute("id","frame");
	frame.setAttribute("alt"," ");
	frame.setAttribute("src","images/frame.gif");
	slideshow.appendChild(frame);

	//鼠标移入链接，图片移动到相应的区域
	var links=intro.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
		    destination=this.getAttribute("href");
		    if(destination.indexOf("index.html")!=-1){
			    moveElement("preview",0,0,5);
		    }
		    if(destination.indexOf("about.html")!=-1){
		    	moveElement("preview",-150,0,5);
		    }
		    if(destination.indexOf("photos.html")!=-1){
		    	moveElement("preview",-300,0,5);
		    }
		    if(destination.indexOf("live.html")!=-1){
		    	moveElement("preview",-450,0,5);
	    	}
	    	if(destination.indexOf("contact.html")!=-1){
		    	moveElement("preview",-600,0,5);
		    }
	    };
	}
}
addLoadEvent(prepareSlideshow);

//showSection()函数，根据指定的ID显示相应的<section>同时隐藏其他部分
function showSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")==id){
			sections[i].style.display="block";
		}
		else{
			sections[i].style.display="none";
		}
	}
}

//点击链接，显示相应的<section>
function prepareInternalnav(){
	//找到链接
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles=document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
 
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
	/*
		links[i].onclick=function(){
		    var clickSection=this.getAttribute("href").split("#")[1];
	    	showSection(clickSection);
		};
	*/
		links[i].destination=sectionId;
		links[i].onclick=function(){
		    showSection(this.destination);
		    return false;
		};
	}
}
addLoadEvent(prepareInternalnav);


//javascript图片库
function preparePlaceholder(){
	//检测
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	//创建占位元素
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("please choose a picture");
	description.appendChild(desctext);

	//将图片和描述放入相应的位置
	var imagegallery=document.getElementById("imagegallery");
	insertAfter(description,imagegallery);
	insertAfter(placeholder,description);

}
//showPic()函数，实现切换图片的描述的功能
function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
	var placeholder=document.getElementById("placeholder");
	if(!document.getElementById("description")) return false;
	var description=document.getElementById("description");
	var source=whichpic.getAttribute("href");
	placeholder.setAttribute("src",source);
	if(whichpic.getAttribute("title")){
	    var text=whichpic.getAttribute("title");
	}
	else{
		var text="";
	}
	if(description.firstChild.nodeType==3){
		description.firstChild.nodeValue=text;
	}
	return false;
}

//点击链接调用showpic()函数实现切换图片和描述的功能
function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
    	links[i].onclick=function(){
    		return showPic(this);	
    	};
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

//隔行变色
function stripeTable(){
	if(!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		var odd=false;
	    var trs=tables[i].getElementsByTagName("tr");
	    for(var j=0;j<trs.length;j++){
	    	if(odd==true){
	    		addClass(trs[j],"odd");
	    		odd=false;
	    	}
	    	else{
	    		odd=true;
	    	}
	    }
	}
}
//鼠标移入，高亮显示
function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].oldClassName=rows[i].className;
		rows[i].onmouseover=function(){
			addClass(this,"highlight");
		};
		rows[i].onmouseout=function(){
			this.className=this.oldClassName;
		};
	}
}
//显示缩略语列表
function displayAbbreviations(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementsByTagName) return false;
	//找到abbr标签并将其值和title存入数组
	var abbreviations=document.getElementsByTagName("abbr");
	if(abbreviations.length==0) return false;
	var array=new Array();
	for(var i=0;i<abbreviations.length;i++){
		if(abbreviations[i].childNodes.length==0) continue;
		var key=abbreviations[i].firstChild.nodeValue;
		var definition=abbreviations[i].getAttribute("title");
		array[key]=definition;
	}

	//从数组里面提取出来,并将其依次放入dl
	var dlist=document.createElement("dl");
	for(key in array){
		var definition=array[key];
		var dtitle=document.createElement("dt");
		var dtitle_text=document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc=document.createElement("dd");
		var ddesc_text=document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}

	//创建标题并将dl，标题放入<article>
	var header=document.createElement("h3");
	var header_text=document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles=document.getElementsByTagName("article");
	var container=articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}
addLoadEvent(stripeTable);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);


//兼容所有浏览器，点击label,关联的表单字段获取焦点
function focusLabels(){
	if(!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick=function(){
			var id=this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var elem=document.getElementById(id);
			elem.focus();
		};
	}
}
addLoadEvent(focusLabels);

//兼容所有浏览器，获取焦点时，删除默认字段
//失去焦点时，若未输入,则令其恢复默认
function resetFields(whichform){
	if(!Modernizr.input.placeholder) return;
	for(var i=0;i<whichform.elements.length;i++){
		var element=whichform.elements[i];
		//element只能在函数内部声明，不然点击任何元素都会触发focus和blur事件
		if(element.type=="submit") continue;
		var check=element.placeholder||element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus=function(){
			var text=this.placeholder||this.getAttribute("placeholder");
			if(this.value==text){
				this.className="";
				this.value="";
			}
		};
		element.onblur=function(){
			if(this.value==""){
				this.className="placeholder";
				this.value=this.placeholder||this.getAttribute("placeholder");
			}
		};
		element.onblur();
	}
}

//验证表单
//检验是否输入内容,若有内容，返回true
function isFilled(field){
	//检测输入的是否为空格等无效字符
	if(field.value.replace(" "," ").length<=0)return false;
	var placeholder=field.placeholder||field.getAttribute("placeholder");
	return (field.value!=placeholder);
}
//检验电子邮件地址,通过检测则返回true
function isEmail(field){
	return (field.value.indexOf("@")!=-1 && field.value.indexOf(".")!=-1);
}
//检测表单是否能通过验证
function validateForm(whichform){
	for(var i=0;i<whichform.elements.length;i++){
		var element=whichform.elements[i];
		if(element.required){
			if(!isFilled(element)){
				alert("please fill in the "+element.name+"field.");
				return false;
			}
		}
		if(element.type=="email"){
			if(!isEmail(element)){
				alert("The"+element.name+"field must be a valid email address");
				return false;
			}
		}
	}
	return true;
}

//提交表单时添加验证行为/*
function prepareForms(){
	for(var j=0;j<document.forms.length;j++){
		var thisForm=document.forms[j];
		resetFields(thisForm);
		thisForm.onsubmit=function(){
			if(!validateForm(this)) return false;//未通过验证时不跳转
			var article=document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this,article)) return false;//ajax请求成功时不跳转
			return true;//ajax未请求成功，让表单想什么都没有发生一样继续通过页面提交
		};
	}
}
addLoadEvent(prepareForms);

//AjAX
function getHTTPObject(){
	if(typeof XMLHttpRequest=="undefined")
	XMLHttpRequest=function(){
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){}
			return false;
	};
	return new XMLHttpRequest();
}

//创建一个加载图像，在AJAX请求刚启动时把它添加到文档中
function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content=document.createElement("img");
	content.setAttribute("src","images/loader.gif");
	content.setAttribute("alt","loading......");
	element.appendChild(content);
}

function submitFormWithAjax(whichform,thetarget){
	//1.获取XMLHttpRequest对象
	var request=getHTTPObject();
	if(!request){return false;}

	//2.创建一个加载图像并将其添加到目标对象上
	displayAjaxLoading(thetarget);

	
	//3.把表单的值组织成URL编码的字符串(name=value&name2=value2&name3=value3)，以便通过AJAX请求发送

	//收集表单的名字和编码保存在数组中
	var dataParts=[];
	var element;
	for(var i=0;i<whichform.elements.length;i++){
		element=whichform.elements[i];
		dataParts[i]=element.name+"="+encodeURIComponent(element.value);
	    //encodeURIComponent函数把这些值编码成URL安全的字符串，会把有歧义的字符转化成对应的ASCII编码
	}
	//收集完数据，把数组的每项数据用&连接起来
	var data=dataParts.join("&");

	//4.创建方法为post的ajax请求，把表单的值发送给submit.html
	//向原始表单的action属性指定的处理函数发送POST请求
	request.open("post",whichform.getAttribute("action"),true);
	//在请求中添加application/x-www-form-urlencoded头部，表示请求中包含URL编码的表单
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	//请求成功，解析响应并在目标元素中显示结果,请求失败，显示错误消息
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200||request.status==0){
				var matchs=request.responseText.match(/<article>([\s\S]+)<\/article>/);
				//()定义的捕获组为了便于后面提取其中匹配的内容，[]包含了要匹配的字符
				if(matchs.length){
					thetarget.innerHTML=matchs[1];
				}
				else{
					thetarget.innerHTML="<p>Oops,there was an error,sorry.</p>";
				}
			}
			else{
				thetarget.innerHTML="<P>"+request.statusText+"</p>";
			}
		}
	};

	if(!request.send(data)) return false;//跨域问题
	return true;
}