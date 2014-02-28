(function () {
    if (typeof window.console === "undefined") {
         window.console = {}
    }
    if (typeof window.console.log !== "function") {
         window.console.log = function () {}
    }
})();

window.onload = function(){

	$("#gachax1, #gachax5, #gachax10").bind("click", function() {
		var count = $(this).attr("count");
		gacha(count);
		}
	);

	$("#gacharoulette").bind("click", function() {
		roulette();
		}
	);
}

	function roulette() {
		$("#monster_view").empty();
		$("#monster_view").append("<font face=\"calibri\" size=5pt>under construction</font>");
	}

	function gacha(count) {

		count = Number(count);

		function setup(){
			$("#monster_view").empty();
			$("#monster_view").append("<table class=\"table table-bordered table-condenced\" id=\"monster_table\"><th>No.</th><th class=\"nametab\">名前</th><th>イメージ</th><th>レア度</th></table>");
		}

		function monster_show (monster) {
			var line = $("<tr class=\"rare" + monster.rare + "\"/>");
			line.append($("<td>" + monster.id + "</td>"));
			line.append($("<td>" + monster.name + "</td>"));
			line.append($("<td><a target=\"_blank\" href=\"" + monster.url + "\"><img src=\"" + monster.img + "\" width=50px height=50px\"></a></td>"));
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
			} while (i<count);
		}

		console.log("start.");

		//setTimeout(function() {
		setup();
		show();
		//}, 10);

	}
