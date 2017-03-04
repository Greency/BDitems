/**
  *@author coderCY
  *@qq 1015561170
  *@date 2017.03.04
**/

(function(){
    var text,btn,robot, //输入框，按钮，小方块
        robotObj = {
            position:{
                x:0,
                y:0,
            },
            direction:"up",  //值为 up down left right
            degree:0 //倾斜的角度
        },
        //指令
        instruct = {
            go:"GO",
            turnLeft:"TUN LEF",
            turnRight:"TUN RIG",
            turnBack:"TUN BAC"
        };

    function init(){
        getElements();
        addListener();
    };

    function getElements(){
        text = document.getElementById("text");
        btn = document.getElementById("btn");
        robot = document.getElementById("robot");
    };

    function addListener(){
        btn.addEventListener("click",function(){
            actionSelect();
        });
    };

    function actionSelect(){
        if(text.value){
            switch(text.value){
                case instruct.go:actionGo();break;
                case instruct.turnLeft:actionTurn("left");break;
                case instruct.turnRight:actionTurn("right");break;
                case instruct.turnBack:actionTurn("back");
            }
        }
    };

    //执行前进
    function actionGo(){
        if(robotObj.direction === "up"){
            if(robotObj.position.y>0){
                robotObj.position.y -= 51.2;
                robot.style.top = robotObj.position.y + "px";
            }
        }else if(robotObj.direction === "down"){
            if(robotObj.position.y<460){
                robotObj.position.y += 51.2;
                console.log("go-- "+robotObj.position.y);
                robot.style.top = robotObj.position.y + "px";
            }
        }else if(robotObj.direction === "left"){
            if(robotObj.position.x>0){
                robotObj.position.x -= 51.2;
                robot.style.left = robotObj.position.x + "px";
            }
        }else if(robotObj.direction === "right"){
            if(robotObj.position.x<460){ 
                robotObj.position.x += 51.2;
                robot.style.left = robotObj.position.x + "px";
            }
        }
    };

    //执行转向
    function actionTurn(type){
        var _degree = 0;//倾斜的角度
        if(type === "left"){
            _degree = -90;
        }else if(type === "right"){
            _degree = 90;
        }else{
            _degree = 180;
        }
        robotObj.degree += _degree;
        robot.style.transform = 'rotate('+robotObj.degree+'deg)';

        if(robotObj.degree === 0 || (robotObj.degree % 360 === 0)){
            robotObj.direction = "up";
        }else if(robotObj.degree % 180 === 0){
            robotObj.direction = "down";
        }else if(robotObj.degree % 360 === -90 || (robotObj.degree > 0 && (robotObj.degree - 270) % 360 === 0)){
            robotObj.direction = "left";
        }else if(robotObj.degree % 360 === 90 || (robotObj.degree < 0 && (robotObj.degree + 270) % 360 === 0)){
            robotObj.direction = "right";
        }
    };

    //启动
    init();
})();
