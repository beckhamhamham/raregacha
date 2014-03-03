(function () {
    if (typeof window.console === "undefined") {
         window.console = {}
    }
    if (typeof window.console.log !== "function") {
         window.console.log = function () {}
    }
})();

window.onload = function(){

	$("#gachax1").bind("click", function() {
		var count = $(this).attr("count");
		gacha(count);
		}
	);

	$("#gacharoulette, #gachax5, #gachax10").bind("click", function() {
		underconstruction();
		}
	);
}

	function underconstruction() {
		$("#monster_view").empty();
		$("#monster_view").append("<font face=\"calibri\" size=5pt>under construction</font>");
	}

	function gacha(count) {

		count = Number(count);

		function setup(){
			$("#monster_view").empty();
		}


		function lot(){
			while(true){
					var lot = (Math.floor(Math.random()*1250));
					if(lot < monsters.length){
						break;
					}
				}
				return lot;
		}

		function monster_show_table (monster) {
			var line = $("<tr class=\"rare" + monster.rare + "\"/>");
			line.append($("<td>" + monster.id + "</td>"));
			line.append($("<td>" + monster.name + "</td>"));
			line.append($("<td><a target=\"_blank\" href=\"" + monster.url + "\"><img src=\"" + monster.img + "\" width=50px height=50px\"></a></td>"));
			line.append($("<td>" + monster.rare + "</td>"));
			$("#monster_table").append(line);
		}

		function monster_show_afteregg (monster) {

			var egg_img = "img/gold.png";
			if (monster.rare == 4){
				egg_img = "img/silver.png";
			} else if (monster.rare < 4){
				egg_img = "img/gomi.png";
			}

			var egg = $("<img src=\"" + egg_img + "\" id=\"view-egg\">");
			egg.appendTo("#monster_view").hide().fadeIn(1000);
			
			// animation egg-fadeout
		    var fadeoutSpeed = 6000;
	        $("#view-egg").fadeOut(fadeoutSpeed);

	        
			// animation parameter-fadein
			setTimeout(function() {
				var monster_img = $("<a target=\"_blank\" href=\"" + monster.url + "\"><img src=\"" + monster.img + "\"></a>");
				var monster_parameter = $("<br><br><br><br><br><table class=\"monster_parameter\"><tr><td>ID</td><td>&nbsp;" + monster.id + "</td></tr><tr><td>Name</td><td>&nbsp;" + monster.name + "</td></tr><tr><td>Rare</td><td>&nbsp;" + monster.rare + "</td></tr></table>");
				monster_img.appendTo("#monster_view").hide().fadeIn(2000);
				monster_parameter.appendTo("#monster_view").hide().fadeIn(2000);
			}, 3000);

			// $("#monster_view").append("<br><br><br><br><br><ul id=\"monster-parameter\"><li>" + monster.id + "</li><li>" + monster.name + "</li><li>" + monster.rare + "</li></ul>");
		 //    var fadeinSpeed = 3000;
	  //       $("#monster-parameter").fadeIn(fadeinSpeed);


		}

		//レアガチャ連続ループ
		function show(){
			var i=0;
			do {
				setTimeout(function(){
					var result = lot();
					// monster_show_table(monsters[result]);
					monster_show_afteregg(monsters[result]);
					console.log("lot=" + result + ", monster.id=" + monsters[result].id);
				},  1000 + i*800);
				i++;
			} while (i<count);
		}

		console.log("start.");

		//setTimeout(function() {
		setup();
		show();
		//}, 10);

	}
