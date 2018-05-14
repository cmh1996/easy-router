function HashRouter(){
	//路由表
	this.routes = {};
	//历史记录
	this.history = [];
	//当前路由
	this.currentUrl = '';
	//当前路由在历史记录中的index
	this.currentIndex = this.history.length-1;
	//判断是否是回退操作
	this.isBack = false;

	this.push = this.push.bind(this);
	this.back = this.back.bind(this);

	window.addEventListener('load',this.push,false);
	window.addEventListener('hashchange',this.push,false);
}

//注册路由到路由表
HashRouter.prototype.route = function(path,callback){
	this.routes[path] = callback || function(){};
}

//转到新路由
HashRouter.prototype.push = function(){
	this.currentUrl = location.hash.slice(1) || '/';
	if(!this.isBack){
		if(this.currentIndex<this.history.length-1){
			this.history = this.history.slice(0,this.currentIndex+1);
		}
		this.history.push(this.currentUrl);
		this.currentIndex++;
	}
	this.routes[this.currentUrl]();
	this.isBack = false;
}

//后退
HashRouter.prototype.back = function(){
	this.isBack = true;
	this.currentIndex<=0 ? (this.currentIndex=0):(this.currentIndex=this.currentIndex-1);
	location.hash = '#'+this.history[this.currentIndex];
}