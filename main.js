
window.onload = function(){

	$("#raregacha").bind("click", function() {

		function setup(){
			$("#monster_view").empty();
			$("#monster_view").append("<table id=\"monster_table\"><th>No.</th><th class=\"nametab\">名前</th><th>イメージ</th><th>レア度</th></table>");
		}

		function monster_show (monster) {
			var line = $("<tr class=\"rare" + monster.rare + "\"/>");
			line.append($("<td>" + monster.id + "</td>"));
			line.append($("<td>" + monster.name + "</td>"));
			line.append($("<td><a href=\"" + monster.url + "\"><img src=\"" + monster.img + "\"></a></td>"));
			line.append($("<td>" + monster.rare + "</td>"));
			$("#monster_table").append(line);

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

		function show(){
			var i=0;
			do {
					
				
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

				setTimeout(function(){
					var result = lot();
					monster_show(monsters[result]);
					console.log("lot=" + result + ", monster.id=" + monsters[result].id);
				},  i*800);
				i++;
			} while (i<5);
		}

		console.log("start.");

		//setTimeout(function() {
		setup();
		show();
		//}, 10);
/*
		var limit = 20;
		var execute = function(i) {
			if(i<limit){
				setTimeout(function() {
					setup();
					i++;
					lot(i == limit);
					execute(i);
				}, 10);
			}
		}

		execute(0);
		*/
	});
}