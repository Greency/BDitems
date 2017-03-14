/**
  *@author coderCY
  *@qq 1015561170
  *@date 2017.03.14
**/

(function(){
    var text,btn,robot, //输入框，按钮，小方块
        robotObj = {
            position:{
                x:0,
                y:0,
            },
            degree:0 //倾斜的角度
        },
        //指令
        instructObj = {
            go:"GO",
            turnLeft:"TUN LEF",  //逆时针旋转90度
            turnRight:"TUN RIG",  //顺时针旋转90度
            turnBack:"TUN BAC",  //旋转180度
            traLeft:"TRA LEF",  //左移一格，方向不变
            traTop:"TRA TOP",  //上移一格，方向不变
            traRight:"TRA RIG",  //右移一格，方向不变
            traBottom:"TRA BOT",  //下移一格，方向不变
            moveLeft:"MOV LFF",  //左移一格，方向向左
            moveTop:"MOV TOP",  //上移一格，方向向上
            moveRight:"MOV RIG",  //右移一格，方向向右
            moverBottom:"MOV BOT"  //下移一格，方向向下
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

    //根据指令执行相应的操作
    function actionSelect(){
        if(text.value){
            switch(text.value){
                case instructObj.go : actionGo("","");break;
                case instructObj.turnLeft : actionTurn(-90);break;
                case instructObj.turnRight : actionTurn(90);break;
                case instructObj.turnBack : actionTurn(-180);break;
                case instructObj.traTop : actionGo("tra",instructObj.traTop);break;
                case instructObj.traRight : actionGo("tra",instructObj.traRight);break;
                case instructObj.traBottom : actionGo("tra",instructObj.traBottom);break;
                case instructObj.traLeft : actionGo("tra",instructObj.traLeft);break;
                case instructObj.moveTop : robotObj.degree = 0;actionTurn(0);actionGo("","");break;
                case instructObj.moveRight : robotObj.degree = 90;actionTurn(0);actionGo("","");break;
                case instructObj.moverBottom : robotObj.degree = 180;actionTurn(0);actionGo("","");break;
                case instructObj.moveLeft : robotObj.degree = 270;actionTurn(0);actionGo("","");break;
                default : actionWarn("instructError");break;
            }
        }else{
            actionWarn("instructError");
        }
    };

    //警告
    function actionWarn(type){
        if (type === "out") {  //超过格子范围
            alert("超出范围");
        }else if(type === "instructError"){
            alert("指令错误");
        }
    }

    //移动
    function actionGo(type,instruct){
        var _flag = true; //true表示是x轴方向的移动,false表示y轴方向的移动 
        if(type === "tra"){
            switch(instruct){
                case instructObj.traTop : (function(){
                    robotObj.position.y > 10 ? robotObj.position.y -= 51.2 : actionWarn("out");
                    _flag = false;
                })();break;
                case instructObj.traRight : (function(){
                    robotObj.position.x < 460 ? robotObj.position.x += 51.2 : actionWarn("out");
                    _flag = true;
                })();break;
                case instructObj.traBottom : (function(){
                    robotObj.position.y <460 ? robotObj.position.y += 51.2 : actionWarn("out");
                    _flag = false;
                })();break;
                case instructObj.traLeft : (function(){
                    robotObj.position.x > 10 ? robotObj.position.x -= 51.2 : actionWarn("out");
                    _flag = true;
                })();break;
                default : actionWarn("instructError");break;
            }
            _flag ? robot.style.left = robotObj.position.x + "px": robot.style.top = robotObj.position.y + "px";
        }else{
            var _degree = robotObj.degree % 360;
            console.log(_degree);
            if (_degree == 0) {  //方向向上
                robotObj.position.y > 10 ? robotObj.position.y -= 51.2 : actionWarn("out");
                 _flag = false;
            }else if(_degree == 90 || _degree == -270){  //方向向右
                robotObj.position.x < 460 ? robotObj.position.x += 51.2 : actionWarn("out");
                _flag = true;
            }else if(_degree == 180 || _degree == -180){  //方向向下
                robotObj.position.y <460 ? robotObj.position.y += 51.2 : actionWarn("out");
                _flag = false;
            }else if(_degree == 270 || _degree == -90){  //方向向左
                robotObj.position.x > 10 ? robotObj.position.x -= 51.2 : actionWarn("out");
                _flag = true;
            }
            console.log(robotObj.position);
            _flag ? robot.style.left = robotObj.position.x + "px": robot.style.top = robotObj.position.y + "px";
            console.log(robot.style.top);
        }
    }

    //转向
    function actionTurn(degree){
        if(robotObj.degree === 360 || robotObj === -360) {
            robotObj.degree = 0; 
        }else if(robotObj.degree === -270) {
            robotObj.degree = 90; 
        }   
        robotObj.degree += degree;
        robot.style.transform = 'rotate('+robotObj.degree+'deg)';
    }

    //启动
    init();
})();
