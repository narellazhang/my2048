define(['butterfly/view', 'main/showAnimation2048','main/support2048'], function(View, Animation,Support){



  return View.extend({
  	thisView : null,
  	board : new Array(),
	score : 0,
	hasConflicted : new Array(),
	startx : 0,
	starty : 0,
	endx : 0,
	endy : 0,
	isGameOver : false,
	MyArray : {
		"2":"小白",
		"4":"实习生",
		"8":"程序猿",
		"16":"项目经理",
		"32":"架构师",
		"64":"技术经理",
		"128":"高级经理",
		"256":"技术总监",
		"512":"副总裁",
		"1024":"CTO",
		"2048":"总裁",
		"4096":"总裁夫人",
		"8192":"总裁岳母"
  	},

  	events:{
  	  
  	  "click #newgamebutton": "newgame"
  
    },
    initialize: function() {
    	thisView = this;
    	console.log("initialize"+thisView);
        $(document).bind('keydown', this.Keydown);
        document.addEventListener('touchstart', this.touchstart);
        document.addEventListener('touchmove', this.touchmove);
        document.addEventListener('touchend', this.touchend);


    },
    render: function(){
      console.log('exhibition/index.html render');
    },

    onShow: function(){
      console.log('exhibition/index.html onShow');
     console.log("onShow:"+this);
      this.prepareForMobile();
	  this.newgame();

	 
    },

    
	prepareForMobile: function(){
		var that = Support;
		if(that.documentWidth > 500){
			that.gridContainerWidth = 500;
			that.cellSpace = 20;
			that.cellSideLength = 100;

		}
		console.log(that.gridContainerWidth);
		$("#grid-container").css({
			'width': that.gridContainerWidth,
			'height': that.gridContainerWidth,
			'padding': that.cellSpace,
			'border-radius':0.02*that.gridContainerWidth
		});
		$(".grid-cell").css({
			'width': that.cellSideLength,
			'height': that.cellSideLength,
			'border-radius':0.02*that.cellSideLength
		});
		
	},
	newgame: function() {
		this.isGameOver = false;
		// 初始化棋盘格
		this.init();
		//随机生成2个数字
		this.generateOneNumber();
		this.generateOneNumber();

	},

	init: function(){
		for(var i = 0 ; i < 4 ; i++ ){
			for(var j = 0 ; j < 4 ; j++ ){
				var gridCell = $("#grid-cell-"+i+"-"+j);
				
				gridCell.css("top",Support.getPosTop(i,j));
				gridCell.css("left",Support.getPosLeft(i,j));


			}
		}
		for(var i = 0 ; i < 4 ; i++ ){
			this.board[i] = new Array();
			this.hasConflicted[i] = new Array();
			for(var j = 0;j < 4 ; j++ )
				this.board[i][j] = 0;
			this.hasConflicted[i][j] = false;
		}

		this.updateBoardView();
		this.score = 0;
	},

	updateBoardView: function(){
		$(".number-cell").remove();
		for(var i = 0 ; i < 4 ; i++ ){
			for(var j = 0 ; j < 4 ; j++ ){
				
				$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
				var theNumberCell = $("#number-cell-"+i+"-"+j);
				
				if(this.board[i][j] == 0){
					theNumberCell.css({
						'width': '0px',
					    'height': '0px',
					    'top': Support.getPosTop(i,j)+Support.cellSideLength/2,
					    'left':Support.getPosLeft(i,j)+Support.cellSideLength/2
					});
					
				}
				else{
					theNumberCell.css({
						'width': Support.cellSideLength,
					    'height': Support.cellSideLength,
					    'top': Support.getPosTop(i,j),
					    'left':Support.getPosLeft(i,j),
					    'backgroundColor':Support.getNumberBackgroundColor(this.board[i][j]),
					    'color':Support.getNumberColor(this.board[i][j])
					});
					theNumberCell.text(this.MyArray[this.board[i][j]]);
				}
				this.hasConflicted[i][j] = false;
			}
		}
		$(".number-cell").css('line-height', Support.cellSideLength+'px');
		$(".number-cell").css('font-size', 0.23*Support.cellSideLength+'px');
	},

	generateOneNumber: function (){
		var board = this.board;
		if(Support.nospace(board))
			return false;
		//随机一个位置
		var randx = parseInt(Math.floor(Math.random()*4));
	    var randy = parseInt(Math.floor(Math.random()*4));

	    var time = 0;
	    while(time<50){
	    	if(board[randx][randy] == 0)
	    		break;
	    	var randx = parseInt(Math.floor(Math.random()*4));
	        var randy = parseInt(Math.floor(Math.random()*4));

	        time++;
	    }
	    if(time == 50){
	    	for(var i = 0 ; i < 4 ; i++ ){
				for(var j = 0 ; j < 4 ; j++ ){
					if(board[i][j]==0){
						randx = i;
						randy = j;
					}
				}
			}
	    }
		//随机一个数字
		var randNumber = Math.random()<0.5? 2 : 4;


		//在随机位置显示随机数字
		board[randx][randy] = randNumber;
		Animation.showNumberWithAnimation(randx,randy,randNumber,this.MyArray);
		return true;
	},

	Keydown: function(event) {
	   	/* Act on the event */
		switch(event.keyCode){
			case 37://left
			    event.preventDefault();
			    if(thisView.moveLeft()){
			    	setTimeout("thisView.generateOneNumber()",210);
			    	setTimeout("thisView.isgameover()",300);
			    	
			    }
			    break;

		    case 38://up
		    	event.preventDefault();
		        if(thisView.moveUp()){
			    	setTimeout("thisView.generateOneNumber()",210);
			    	setTimeout("thisView.isgameover()",300);
			    }
		        break;

		    case 39://right
		    	event.preventDefault();
		        if(thisView.moveRight()){
			    	setTimeout("thisView.generateOneNumber()",210);
			    	setTimeout("thisView.isgameover()",300);
			    }
		        break;

		    case 40://down
		    	event.preventDefault();
		        if(thisView.moveDown()){
			    	setTimeout("thisView.generateOneNumber()",210);
			    	setTimeout("thisView.isgameover()",300);
			    }
		        break;
		    default:
		        break;

		}
	},

	touchstart: function(event){
		startx = event.touches[0].pageX;
		starty = event.touches[0].pageY;
	},
	touchmove: function(event){
		event.preventDefault();
	},

	touchend: function(event){
		var documentWidth = Support.documentWidth;
		endx = event.changedTouches[0].pageX;
		endy = event.changedTouches[0].pageY;



		var deltax = endx-startx;
		var deltay = endy-starty;

		if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth)
			return;

		if(Math.abs(deltax)>=Math.abs(deltay)){
			if(deltax>0){
				//move right
				
				if(thisView.moveRight()){
			    	setTimeout("thisView.generateOneNumber()",210);
			    	setTimeout("thisView.isgameover()",300);
			    }
			}
			else{
				//move left
				
				if(thisView.moveLeft()){
			    	setTimeout("thisView.generateOneNumber()",210);
			    	setTimeout("thisView.isgameover()",300);
			    	
			    }
			}
		}
		else{
			if(deltay>0){
				//move down
				
				if(thisView.moveDown()){
			    	setTimeout("thisView.generateOneNumber()",210);
			    	setTimeout("thisView.isgameover()",300);
			    }
			}
			else{
				//move up

				 if(thisView.moveUp()){
			    	setTimeout("thisView.generateOneNumber()",210);
			    	setTimeout("thisView.isgameover()",300);
			    }
			}
		}

	},

	isgameover: function (){
		if(Support.nospace(this.board)&&Support.nomove(this.board)){
			this.gameover();
		}
	},

	gameover: function(){
		if(this.isGameOver)
			return;
		var max = 2;
		for(var i = 0 ; i < 4 ; i++ )
			for(var j = 0 ; j < 4 ; j++ )
					max = this.board[i][j]>max?this.board[i][j]:max;
		this.isGameOver = true;
		alert("游戏结束！争取下次成为"+this.MyArray[max*2]+"~");
	},

	moveLeft: function(){
		var board = this.board;
		if(!Support.canMoveLeft(board))
			return false;

		//moveLeft
		for(var i = 0 ; i < 4 ; i++ ){
			for(var j = 1 ; j < 4 ; j++ ){
				if(board[i][j]!=0){
					for(var k=0;k<j;k++){
						if(board[i][k] == 0 && Support.noBlockHorizental(i,k,j,board)){
							//move
							Animation.showMoveAnimation(i,j,i,k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[i][k]==board[i][j]&& Support.noBlockHorizental(i,k,j,board)&& !this.hasConflicted[i][k]){
							Animation.showMoveAnimation(i,j,i,k);
							//add
							board[i][k] += board[i][j];
							Animation.cellAddPlus(i,k);
							board[i][j] = 0;
							//add score
							this.score +=board[i][k];

							Animation.updateScore(this.score);

							this.hasConflicted[i][k]=true;
							
							continue;
						}
					}
				}
			}
		}
		setTimeout("thisView.updateBoardView()",200);
		return true;
	},

	moveRight: function(){
		var board = thisView.board;
		if(!Support.canMoveRight(board))
			return false;

		//moveRight
		for(var i = 0 ; i < 4 ; i++ ){
			for(var j = 2 ; j > -1 ; j-- ){
				if(board[i][j]!=0){
					for(var k=3;k>j;k--){
						if(board[i][k] == 0 && Support.noBlockHorizental(i,j,k,board)){
							//move
							Animation.showMoveAnimation(i,j,i,k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[i][k]==board[i][j]&& Support.noBlockHorizental(i,j,k,board)&& !this.hasConflicted[i][k]){
							//move
							Animation.showMoveAnimation(i,j,i,k);
							//add
							board[i][k] += board[i][j];
							Animation.cellAddPlus(i,k);
							board[i][j] = 0;

							this.score +=board[i][k];
							Animation.updateScore(this.score);
							this.hasConflicted[i][k] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout("thisView.updateBoardView()",200);
		return true;
	},

	moveUp: function(){
		var board = thisView.board;
		if(!Support.canMoveUp(board))
			return false;

		//moveUp
		for(var j = 0 ; j < 4 ; j++ ){//列
			for(var i = 1 ; i < 4 ; i++ ){//行
				if(board[i][j]!=0){
					for(var k=0;k<i;k++){
						if(board[k][j] == 0 && Support.noBlockVertical(j,k,i,board)){
							//move
							Animation.showMoveAnimation(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[k][j]==board[i][j]&& Support.noBlockVertical(j,k,i,board)&&!this.hasConflicted[k][j]){
							//move
							Animation.showMoveAnimation(i,j,k,j);
							//add
							board[k][j] += board[i][j];
							Animation.cellAddPlus(k,j);
							board[i][j] = 0;

							this.score +=board[k][j];
							Animation.updateScore(this.score);
							this.hasConflicted[k][j] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout("thisView.updateBoardView()",200);
		return true;
	},

	moveDown: function (){
		var board = thisView.board;
		if(!Support.canMoveDown(board))
			return false;

		
		for(var j = 0 ; j < 4 ; j++ ){//列
			for(var i = 2 ; i > -1 ; i-- ){//行
				if(board[i][j]!=0){
					for(var k=3;k>i;k--){
						if(board[k][j] == 0 && Support.noBlockVertical(j,i,k,board)){
							//move
							Animation.showMoveAnimation(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[k][j]==board[i][j]&&Support.noBlockVertical(j,i,k,board)&& !this.hasConflicted[k][j]){
							//move
							Animation.showMoveAnimation(i,j,k,j);
							//add
							board[k][j] += board[i][j];
							Animation.cellAddPlus(k,j);
							board[i][j] = 0;

							this.score +=board[k][j];
							Animation.updateScore(this.score);

							this.hasConflicted[k][j] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout("thisView.updateBoardView()",200);
		return true;
	},



  });
});
