define([], function() {

	return {
		documentWidth : document.body.clientWidth,
		gridContainerWidth : 0.92*document.body.clientWidth,
		cellSideLength : 0.18*document.body.clientWidth,
		cellSpace : 0.04*document.body.clientWidth,

		getPosTop: function(i,j){
			return this.cellSpace+i*(this.cellSpace+this.cellSideLength);
		 },


		 getPosLeft: function(i,j){
			return this.cellSpace+j*(this.cellSpace+this.cellSideLength);
		},

		getNumberBackgroundColor: function(number) {
			// body...
			switch(number){
				case 2:return "#eee4da";break;
				case 4:return "#ede0c8";break;
				case 8:return "#f2b179";break;
				case 16:return "#f59563";break;
				case 32:return "#f67c5f";break;
				case 64:return "#f65e3b";break;
				case 128:return "#edcf72";break;
				case 256:return "#edcc61";break;
				case 512:return "#9c0";break;
				case 1024:return "#33b5e5";break;
				case 2048:return "#09c";break;
				case 4096:return "#a6e";break;
				case 8192:return "#93e";break;

			}
			return "black";
		},

		 getNumberColor: function(number){
			if(number<=4)
				return "#776a65";
			return "white";
		},

		nospace: function(board){
			for(var i = 0 ; i < 4 ; i++ ){
				for(var j = 0 ; j < 4 ; j++ ){
					if(board[i][j] == 0)
						return false;
				}
			}
			return true;
		},



		canMoveLeft: function(board){
			for(var i = 0 ; i < 4 ; i++ ){
				for(var j = 1 ; j < 4 ; j++ ){
					if(board[i][j]!=0)
						if((board[i][j-1] == 0)||(board[i][j-1] == board[i][j]))
							return true;
				}
			}
			return false;

		},


		canMoveRight: function(board){

			for(var i = 0 ; i < 4 ; i++ ){
				for(var j = 0 ; j < 3 ; j++ ){
					if(board[i][j]!=0)
						if((board[i][j+1] == 0)||(board[i][j+1] == board[i][j]))
						{
							return true;

						}
				}
			}
			return false;

		},


		canMoveUp: function(board){
			for(var i = 0 ; i < 4 ; i++ ){
				for(var j = 1 ; j < 4 ; j++ ){
					if(board[j][i]!=0)
						if((board[j-1][i] == 0)||(board[j-1][i] == board[j][i]))
							return true;
				}
			}
			return false;

		},

		canMoveDown: function(board){

			for(var i = 0 ; i < 4 ; i++ ){
				for(var j = 0 ; j < 3 ; j++ ){
					if(board[i][j]!=0)
						if((board[j+1][i] == 0)||(board[j+1][i] == board[j][i]))
						{
							return true;

						}
				}
			}
			return false;

		},

		noBlockHorizental: function(row,col1,col2,board){
			for(var i=col1+1;i<col2;i++){
				if(board[row][i]!=0)
					return false;
			}
			return true;
		},
		noBlockVertical: function(col,row1,row2,board){
			for(var i=row1+1;i<row2;i++){
				if(board[i][col]!=0)
					return false;
			}
			return true;

		},

		nomove: function(board){
			if(this.canMoveDown(board)||this.canMoveUp(board)||this.canMoveRight(board)||this.canMoveLeft(board))
				return false;
			return true;
		},

	}

})