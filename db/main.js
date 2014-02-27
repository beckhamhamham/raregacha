window.onload = function(){

	// モンスターを monster_area 下に追加する
	function appendMonster(monster){
		var base = $("#monster_area");
    	var obj = $("<div/>")
    	obj.append($("<p>" + monster.name + "</p>"));
    	obj.append($("<img src='" + monster.img + "'>"));
	    base.append(obj);
	    console.log(monster)		
	}

	// ループする例
	monsters.forEach(
	    function addMonster(monster) 
	    {
	    	appendMonster(monster);
	    }
	);

	// モンスター指定で取得する例
	var monster = monsters[0];
	appendMonster(monster);
}