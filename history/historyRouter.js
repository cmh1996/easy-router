function HistoryRouter(){
	this.routes = {};
	
	//仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，
	//或者使用 JavaScript 调用back、forward、go方法时才会触发。
	window.addEventListener('popstate',function(e){
		var path = e.state && e.state.path;
		this.routes[path] && this.routes[path]();
	})
}

HistoryRouter.prototype.route = function(path,cb){
	this.routes[path] = cb || function(){};
}

HistoryRouter.prototype.replace = function(path){
	history.replaceState({path:path},null,path);
	this.routes[path] && this.routes[path]();
}

HistoryRouter.prototype.push = function(path){
	history.pushState({path:path},null,path);
	this.routes[path] && this.routes[path]();
}

HistoryRouter.prototype.back = function(){
	history.back();
}

HistoryRouter.prototype.forward = function(){
	history.forward();
}

HistoryRouter.prototype.go = function(count){
	history.go(count);
}