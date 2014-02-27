
window.onload = function(){

	$("#raregacha").bind("click", function() {

		function setup(){
			$("#monster_view").empty();
			$("#monster_view").append("<table id=\"monster_table\"><th>No.</th><th class=\"nametab\">名前</th><th>イメージ</th><th>レア度</th></table>");
		}

		function monster_show (monster) {
			var line = $("<tr/>");
			line.append($("<td>" + monster.id + "</td>"));
			line.append($("<td>" + monster.name + "</td>"));
			line.append($("<td><a href=\"" + monster.url + "\"><img src=\"" + monster.img + "\"></a></td>"));
			line.append($("<td>" + "未実装" + "</td>"));
			$("#monster_table").append(line);

			console.log("lot = " + lot);
		}

		function lot(){
			var i=0;
			do {
				var lot = (Math.floor(Math.random()*25));
				/*
				if(lot < 3) {
					var egg_result = "img/gomi.png";				
				} else if(lot < 6){
					var egg_result = "img/silver.png";
				} else {
					var egg_result = "img/gold.png";
				}

				$("#monster_img").attr("src",egg_result);
				*/
				monster_show(monsters[lot]);
				i++;
			} while (i<5);
		}

		var execute = function(i) {
			if(i<20){
				setTimeout(function() {
					setup();
					lot();
					i++;
					execute(i);
				}, 10);
			}
		}

		execute(0);
	});
}