$(document).ready(function (){
	if(!$("#myCanvas").tagcanvas({
		textColour: "#00ff41",
		outlineColour: "transparent",
		reverse: false,
		depth: 0.8,
		maxSpeed: 0.1,
		weight: true,
	}, "tags")){
		//somthing went wrong 
		$("#myCanvasContainer");
	}
})
