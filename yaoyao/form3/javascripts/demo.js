/**
  *@author coderCY
  *@qq 1015561170
  *
**/
var data = {
    city:["重庆","北京","上海"],
    school:{
        array0:["重庆大学","重庆医科大学","重庆交通大学"],
        array1:["北京大学","清华大学","北京师范大学"],
        array2:["复旦大学","上海交通大学","同济大学"]
    }
};

var FormRadioSelect = function(){
    var stuRadio,noStuRadio, //在校生，非在校生单选按钮
        stuSelectWrapper,noStuSelectWrapper, 
        city,university;

    this.init = function(){
        this.getElements();
        this.action();
    };

    this.getElements = function(){
        stuRadio = document.getElementById("stu_radio");
        noStuRadio = document.getElementById("no_stu_radio");
        stuSelectWrapper = document.getElementsByClassName("stu-select-wrapper")[0];
        noStuSelectWrapper = document.getElementsByClassName("no-stu-select-wapper")[0];
        city = document.getElementsByName("city")[0];
        university = document.getElementsByName("university")[0];
    };

    this.action = function(){
        var _self = this;
        stuRadio.addEventListener("click",function(){
            _self.showSelect(true);
        });
        noStuRadio.addEventListener("click",function(){
            _self.showSelect(false);
        });

        city.addEventListener("blur",function(){
            _self.selectLinkage(this.value);
        });
    };

    //根据在校生 (true)，非在校生(false)选择不同的展示效果
    this.showSelect = function(flag){
        var _obj1,_obj2;
        if(flag){
            _obj1 = noStuSelectWrapper;
            _obj2 = stuSelectWrapper;
        }else{
            _obj1 = stuSelectWrapper;
            _obj2 = noStuSelectWrapper;
        }
        _obj1.style.display = "none";
        _obj2.style.display = "block";
    };

    //联动 选择城市 -> 大学
    this.selectLinkage = function(city){
        var num,html = "";

        for(var i = 0;i < data.city.length;i++){
            if (city === data.city[i]) {
                num = i;
                break;
            }
        }

        for(var i = 0;i < data.school["array"+num].length;i++){
            html +='<option value='+data.school["array"+num][i]+'>'+data.school["array"+num][i]+'</option>'; 
        }

        university.innerHTML = html;
    };
}