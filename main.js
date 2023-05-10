object = []
status1 = " "
function setup(){
    Canvas = createCanvas(400,400)
    Canvas.position(550,400)
    video = createCapture(VIDEO)
    video.hide()
    video.size(400,400)
}
function begin(){
    objectDetect = ml5.objectDetector("cocossd",modelloaded)
    document.getElementById("status").innerHTML = "Started Detecting....."
    Object_To_be_found = document.getElementById("obj").value 
    Object_to_detect = Object_To_be_found.toUpperCase()
    console.log(Object_To_be_found,Object_to_detect)
}
function modelloaded(){
    console.log("MOdel loaded")
    status1 = true;
}
function gotResult(error,result){
    if(error){
        console.error(error)
    }
    else{
        
        object = result
    }
}
function draw(){
    image(video,0,0,400,400)
    if(status1 != " "){
        objectDetect.detect(video,gotResult)
        for(i=0;i<object.length;i++){
            fill("#FF0000")
            percent = floor((object[i].confidence)*100)
            text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15)
            noFill("#FF0000")
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
            object_found = object[i].label.toUpperCase()
            if(object_found == Object_to_detect){
                document.getElementById("Obj_found").innerHTML = Object_to_detect+" has been detected"
            }
            else{
                document.getElementById("Obj_found").innerHTML = Object_to_detect+" has not been detected"
            }
        }   
    }
}