define(['main/support2048'], function(Support) {

	return {
		showNumberWithAnimation: function(i, j, randNumber,MyArray) {
			var numberCell = $("#number-cell-" + i + "-" + j);
			numberCell.css({
				'backgroundColor': Support.getNumberBackgroundColor(randNumber),
				'color': Support.getNumberColor(randNumber)
			});
			numberCell.text(MyArray[randNumber]);

			numberCell.animate({
				width: Support.cellSideLength,
				height: Support.cellSideLength,
				top: Support.getPosTop(i, j),
				left: Support.getPosLeft(i, j)
			}, 50);
		},


		showMoveAnimation: function(fromx, fromy, tox, toy) {
			var numberCell = $("#number-cell-" + fromx + "-" + fromy);
			numberCell.animate({
				top: Support.getPosTop(tox, toy),
				left: Support.getPosLeft(tox, toy)
			}, 200);
			
		},

		cellAddPlus:function(i,j){
			var numberCell = $("#number-cell-" + i + "-" + j);
			numberCell.addClass('plus');
			numberCell.bind("webkitAnimationEnd", function(){numberCell.removeClass('plus');}, false);
			numberCell.bind("msAnimationEnd", function(){numberCell.removeClass('plus');}, false);
      		numberCell.bind("oAnimationEnd", function(){numberCell.removeClass('plus');}, false);
      		numberCell.bind("oAnimationend", function(){numberCell.removeClass('plus');}, false);
      		numberCell.bind("Animationend", function(){numberCell.removeClass('plus');}, false);
		},
		
		updateScore: function(score){
			
		   $("#score").text(score);
		 
		}
	}

})