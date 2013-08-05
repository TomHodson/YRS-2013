var soundEmbed = null;
//======================================================================
function soundPlay(which)
    {
    if (!soundEmbed)
    	{
    	soundEmbed = document.createElement("embed");
    	soundEmbed.setAttribute("src", "/snd/"+which+".wav");
    	soundEmbed.setAttribute("hidden", true);
    	soundEmbed.setAttribute("autostart", true);
    	}
    else
    	{
    	document.body.removeChild(soundEmbed);
    	soundEmbed.removed = true;
    	soundEmbed = null;
    	soundEmbed = document.createElement("embed");
    	soundEmbed.setAttribute("src", "/snd/"+which+".wav");
    	soundEmbed.setAttribute("hidden", true);
    	soundEmbed.setAttribute("autostart", true);
    	}
    soundEmbed.removed = false;
    document.body.appendChild(soundEmbed);
    }
//======================================================================


var stage = null
var points = [];
var group_colours = ["rgba(255,0,0,1)","rgba(0,255,0,1)","rgba(0,0,255,1)", "rgba(0,255,255,1)", "rgba(255,0,255,1)", "rgba(255,255,0,1)"];

var shoutposition = function() {
	var shout = function(pos) {
		alert("lat: " + pos.coords.latitude);
		console.log(pos);
	}
	navigator.geolocation.getCurrentPosition(shout);
}

var buttons = {
				"list_of" : [
					{
						"text" : "Get location",
						"function" : "shoutposition()",
						"toggle" : null,
					},
					{
						"text" : "hello, world",
						"function" : "soundPlay('http://speech.jtalkplugin.com/audio/1307030738170.mp3')",
						"toggle" : null,
					}

				],
				"setup" : function() {
					var buttonWrapper = document.getElementById("buttonWrapper");

					for (var i = this.list_of.length - 1; i >= 0; i--) {
						var button = document.createElement('button');
						button.type = "button";
						button.innerText = this.list_of[i].text;
						button.code = this.list_of[i].function || this.list_of[i].text;
						button.onclick = function() {eval(this.code);};
						buttonWrapper.appendChild(button);

					};
				},
				"catch_mouse_click" : function(click) {
					return;
				}

			};


var setup = function() {
	stage = new Kinetic.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      var button_layer = new Kinetic.Layer();

      var box = new Kinetic.Rect({x:0, y:0, 
      	width: stage.getWidth(), 
      	height: stage.getHeight(),
      	fill: "rgba(255,0,0,0)",
      	stroke: "rgba(1,1,1,1)"
      })

      button_layer.add(box)

      // add the layer to the stage
      stage.add(button_layer);

	box.on("click", function(evt) {
		//console.log(evt)
		var circle = new Kinetic.Circle({
        x: evt.offsetX,
        y: evt.offsetY,
        radius: 10,
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true
      })
		circle.on("mouseenter", function(evt) {this.setOpacity(1);  button_layer.draw()});
		circle.on("mouseleave", function(evt) {this.setOpacity(0.2); button_layer.draw()});
      button_layer.add(circle);
      circle.draw();

	});

	buttons.setup();

};


window.onload = setup;
