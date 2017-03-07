
var app=angular.module('app',[]);


app.controller('test',function($scope,$http){
    ////
    var g_narrow=document.getElementById('g_narrow');
    var r_narrow=document.getElementById('r_narrow');
    var xl_box=document.getElementById('xl_box');
    $scope.show=function(){
        r_narrow.style.display='block';
        g_narrow.style.display='none';
        xl_box.style.display='block';
    }

    $scope.hide=function(){
        r_narrow.style.display='none';
        g_narrow.style.display='block';
        xl_box.style.display='none';
    }

/////
    $http.get('/cityBox').success(function(data){
        $scope.data=data.data;
    })
    $scope.a='北京';
    $scope.letter=function(index){
        $scope.a=index;
    }
//brand
    $http.get('/brand').success(function(data){
        $scope.json={};
        $scope.arr=[];
		
        if(data.error){
        }else{
            $scope.brandData=data.data;

            angular.forEach($scope.brandData,function(v,k){
              $scope.json[v.brandLetter]=0;
            })
            angular.forEach($scope.json,function(v1,k1){

                var  arr2=[];
                angular.forEach($scope.brandData,function(v,k){

                    if(k1==v.brandLetter){
                        arr2.push(v.brandName)
                    }
                })
                $scope.json={};
                $scope.json.letters=k1;
                $scope.json.names=arr2;

                $scope.arr.push($scope.json);
            })
        }

    })

    //搜索品牌
    $scope.searchBrand=searchBrand;
    function searchBrand(){
        var sb = $scope.st;
        if(sb==''){
            $scope.searchDa=[];
            return;
        }
        $http.get('/sbrand',{params:{letter:$scope.st}}).success(function(data){
            $scope.searchDa=data.data;
        })

    };

     $scope.$watch('st',function(){
         searchBrand();
    })




//banner
    $scope.selected=0;
$http.get('/banner').success(function(data){

    if(data.error){

    }else{
        $scope.banner=data.data;

    }

}).error(function(){
    alert('哎呦，不行了哦')
})

    $scope.change=function(n){
        $scope.selected=n;
    }
//footer fixed
    $scope.cb=function(){
        var oUl=document.getElementById('cs_con');
        var aLi=oUl.children;
        angular.forEach(aLi,function(i){
            $scope.cl=function(){
                aLi[i].style.background='red';
            }
        })
        $scope.cl();
    }
////price
    $http.get('/price').success(function(data){
        $scope.pData=data.data;
    })
//type
    $http.get('/type').success(function(data){
        $scope.tData=data.data;
    })
//forum
    $http.get('/forum').success(function(data){
        $scope.fData=data.data;
    })
//sign in
    $scope.signin=function(){
        $http.get('/signin',{params:{
            user:$scope.ut,
            pass:$scope.pt,
            tel:$scope.tt
        }}).success(function(data){
            if(data.error){
                alert('注册成功');
            }else{

            }
        }).error(function(){
            alert('数据加载失败')
        })
    }

//通过类型拿数据
    $scope.carNum=0;
    $scope.getCar=function(type,index){
        $http.get('/getCarsByType',{params:{
            type:type
        }}).success(function(data){
            if(data.error){
                alet(data.msg);
            }else{
                $scope.carData=data.data;
                $scope.carNum=index;
            }
        }).error(()=>{})
    }
    $scope.getCar('特价好车',1);
///

$scope.hello=function(){
    $scope.searchDa=[];
}



//////
})




