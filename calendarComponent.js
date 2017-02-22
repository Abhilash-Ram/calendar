var app = angular.module('app', []);
app.controller('ctrl', function($scope) {
  var vm = $scope
vm.dayList = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  vm.monthList = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var today = new Date();
  vm.conditionDay = today;
  var dd = today.getDate();
  var mm = today.getMonth();
  var yyyy = today.getFullYear();
  if(dd<10){
  mm='0'+mm;
  }
  vm.showDate = vm.monthList[Number(mm)] +", "+ yyyy;
  vm.previous = function(){
    mm--;
    if(mm<0){
      mm=11
      yyyy--;
    }
    vm.getDaysInMonth(mm, yyyy)
    vm.showDate =  vm.monthList[Number(mm)] +", "+ yyyy;
  }
  vm.today = function(){
    mm=new Date().getMonth();
    yyyy = new Date().getFullYear();
    vm.getDaysInMonth(mm, yyyy)
    vm.showDate =  vm.monthList[Number(mm)]  +", "+ yyyy;
  }
  vm.next = function(){
    mm++;
    if(mm>11){
      mm=0
      yyyy++;
    }
    vm.getDaysInMonth(mm, yyyy)
    vm.showDate =  vm.monthList[Number(mm)]  +", "+ yyyy;
  }
  vm.goToDate = function(_user_date){
    var _usr_in = new Date(_user_date)
    mm=_usr_in.getMonth()
    yyyy=_usr_in.getFullYear();
    vm.showDate =  vm.monthList[Number(mm)] +", "+ yyyy;
    vm.getDaysInMonth(mm, yyyy)
  }
  vm.isToday =function(date){
    if(vm.conditionDay.getDate() == date.getDate()){
      if(vm.conditionDay.getMonth() == date.getMonth()){
        if(vm.conditionDay.getFullYear() == date.getFullYear()){
          return true;
        }
      }
    }
    return vm.conditionDay == date
  }
  vm.hasElements = function(obj){
    var keyCount = false
    if(obj != null || obj != undefined || !angular.equals(obj,{})){
      for(var key in obj){
        keyCount = true;
      }
    }
    return keyCount;
  }
  vm.dispColor = function(today){
    if(vm.hasElements(today)){
        var dispToday = today.date
        if(vm.isToday(dispToday)){
          return {'background':'orange','color':'#fff'}
        }else{
          if(today.day=='Sunday' || today.day == 'Saturday'){
              return {'background':'#eaeaea'}
          }else{
            return {'background':'#fff'}
          }
        }
    }else{
      return {'background':'#fff'}
    }

  }
  vm.getDaysInMonth = function(month, year) {
    console.log(month +" "+ year)
     var date = new Date(year, month, 1);
     var week = {}
     var days = [];
     var count = 0 ;
     while (date.getMonth() === month) {
       if(new Date(date).getDate()==1){
         for(var i = 0 ; i < new Date(date).getDay() ; i++ ){
           week[vm.dayList[new Date(date).getDay()]] = {};
           count++;
         }
       }
        week[vm.dayList[new Date(date).getDay()]]={
                                                    dateNum : new Date(date).getDate(),
                                                    day : vm.dayList[new Date(date).getDay()],
                                                    date: new Date(date)
                                                  };
        date.setDate(date.getDate() + 1);
        count++;
        if(count == 7){
          console.log(week)
          days.push(week)
          week={}
          count = 0
        }
     }
     days.push(week)
     week=[];
     vm.currMonthDates=days;
}
  vm.getDaysInMonth(today.getMonth(), today.getFullYear())
});