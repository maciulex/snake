var blank = "<tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
var apple = [];
var direction = "right";
var interval = 120;
var intervalF;
var pause = true;
var point = [{"x": 5, "y": 5}];
var scoreD = [];
// środek == 5,5
// odczytywanie jaki guzik został naciśnięty
document.addEventListener('keydown', function (event) {
	var a = event.keyCode;
	if (a == 13 && pause == true) {
		applea();
		intervalF = setInterval(move, interval);
		pause = false;
	};
	if ((a == 87 || a == 38) && direction != "down") {
		direction = "up";
	} else if ((a == 65 || a == 37) && direction != "right") {
		direction = "left";
	} else if ((a == 83 || a == 40) && direction != "up") {
		direction = "down";
	} else if ((a == 68 || a == 39) && direction != "left") {
		direction = "right";	
	};
    if (a == 27) {
        if (pause == false) {
            pause = true;
            clearInterval(intervalF);
            fogOfWar(1);
        } else {
            pause = false;
            fogOfWar(2);
            intervalF = setInterval(move, interval);
        }
    }
	return;
});
function move() {
		applea();
		if (direction == "up") {
			var a = {"x": point[0]["x"], "y": point[0]["y"]-1};
			point.unshift(a);
			//console.log("x = "+point[0]["x"]+", y = "+point[0]["y"]);
		} else if (direction == "down") {
			var a = {"x": point[0]["x"], "y": point[0]["y"]+1};
			point.unshift(a);
			//console.log("x = "+point[0]["x"]+", y = "+point[0]["y"]);
		} else if (direction == "right") {
			var a = {"x": point[0]["x"]+1, "y": point[0]["y"]};
			point.unshift(a); 
			//console.log("x = "+point[0]["x"]+", y = "+point[0]["y"]);
		} else if (direction == "left") {
			var a = {"x": point[0]["x"]-1, "y": point[0]["y"]};
			point.unshift(a);
			//console.log("x = "+point[0]["x"]+", y = "+point[0]["y"]);
		}
		if (point.length != 1) {
			point.splice(point.length-1);
		}
	loseCh();
	draw();
	return;
}
function draw() {
	var table = document.getElementById("snake");
	table.innerHTML = blank;
	table.rows[apple[0]["y"]].cells[apple[0]["x"]].style.backgroundColor = "green";
	for (var i = 0; i <= point.length - 1; i++) {
		table.rows[point[i]["y"]].cells[point[i]["x"]].style.backgroundColor = "black";
		table.rows[point[i]["y"]].cells[point[i]["x"]].style.borderColor = "red";
		//console.log("i'm here working");
	}
	return;
}
function loseCh() {
	function lose() {
			if (document.forms["f2"]["i3"].checked == true) {
				alert("przegrałeś >:");
			}
			scoreF();
			point = [{"x": 5,"y": 5,}];
			direction = "right";
			clearInterval(intervalF);
			pause = true;
			draw();
			scoreUpdate();
	}
	if (point.length == 121) {
		alert("wygrałeś!! Gratulacje!!!");
	}
	for (var i = 1; i <= point.length - 1; i++) {
		if (point[i]["y"] == point[0]["y"]  && point[i]["x"] == point[0]["x"]) {
				lose();
		}
	}
	if (point[0]["y"] >= 11 || point[0]["y"] < 0 || point[0]["x"] >= 11 || point[0]["x"] < 0) {
				lose();
	}
	if (point[0]["x"] == apple[0]["x"] && point[0]["y"] == apple[0]["y"]) {	
		apple.splice(0);
		var lastPoint = point[point.length-1];
		point.push(lastPoint);
		//console.log("apple disapear");	
		applea();
	};
	return;
};
function applea() {
	if (apple.length == 0) {
		scoreUpdate();
		var mathx = Math.round(Math.random()*10);
		var mathy = Math.round(Math.random()*10);
			if (document.getElementById("snake").rows[mathy].cells[mathx].style.backgroundColor == "black") {
				applea();
				//console.log("apple in sneak");
			} else {
				apple = [];
				var a = {"x": mathx, "y": mathy};
				apple.push(a);
				//console.log("apple not exist");	
				draw();
			};
	};
	return;
}
function intervalF() {
    var holder = document.forms["f1"]["b1"].value;
    if (holder != "") {
        interval = holder; 
    }
    document.getElementById("intervalHTML").innerHTML = interval;
    //console.log(interval);
	return;
}
function scoreF() {
	var table = document.getElementById("scoreT");
	var nick = getNick();
	var scoreDa = {"score": point.length, "nick": nick};
	if (scoreD.length != 0) {
		//console.log("one");
		for (var i = 0; i <= scoreD.length-1; i++) {
			//console.log("two");
			if (scoreD[i]["score"] < scoreDa["score"]) {
				if (i == 0) {
					if (scoreD.length == 5) {
						scoreD.pop();
					}
					scoreD.unshift(scoreDa);
					break;
				} else {
					if (scoreD.length == 5) {
						scoreD.pop();
					}
					scoreD.splice(i, 0, scoreDa);
					break;
				}
			} else if (scoreD.length < 5 && i == scoreD.length-1) {
				scoreD.push(scoreDa);
				break;
			}
		}
	} else {
		scoreD.push(scoreDa);
	}
	for (var i = 0; i <= scoreD.length-1; i++) {		
		table.rows[i+1].cells[1].innerHTML = scoreD[i]["nick"];
		table.rows[i+1].cells[2].innerHTML = scoreD[i]["score"];
	}
	return;
}
function getNick() {
	var nick;
	if (document.forms["f2"]["i1"].checked == true) {
		nick = document.forms["f2"]["i2"].value;
	} else {
		nick = prompt("przegrałeś podaj swój nick");
	}
	if (nick == "") {
		nick = "unnamed";
	}
	return nick;
}
function fogOfWar(a) {
	var table = document.getElementById("snake");
	if (a == 1) {
		table.rows[apple[0]["y"]].cells[apple[0]["x"]].style.backgroundColor = "black";
		table.style.backgroundColor = "black";
		for (var i = 0; i <= point.length - 1; i++) {
			table.rows[point[i]["y"]].cells[point[i]["x"]].style.borderColor = "black";
		}
	} else {
		table.rows[apple[0]["y"]].cells[apple[0]["x"]].style.backgroundColor = "green";
		table.style.backgroundColor = "";
		for (var i = 0; i <= point.length - 1; i++) {
			table.rows[point[i]["y"]].cells[point[i]["x"]].style.borderColor = "red";
		}
	}
	return;
}
function scoreUpdate() {
	var score = point.length;
	var table = document.getElementById("actualScore");
	if (score < 10) {
		table.rows[0].cells[1].innerHTML = "00" + score;
	} else if (score < 100) {
		table.rows[0].cells[1].innerHTML = "0" + score;
	} else {
		table.rows[0].cells[1].innerHTML = score;
	}
	return;
}
applea();
intervalF();

