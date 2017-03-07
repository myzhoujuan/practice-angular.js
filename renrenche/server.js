
const express=require('express');
const static=require('express-static');
const mysql=require('mysql');

var db=mysql.createConnection({host:'localhost',user:'root',password:'',database:'rerenche',port:3308});

var server=express();
server.listen(1234);
//city
server.get('/cityBox',function(req,res){//req.query

    db.query('SELECT * FROM city ORDER BY cityLetter,cityID',function(err,data){

    if(err){
        res.send({error:true,msg:"无法加载数据"});
        res.end();
    }else{
        var arr=[];
        var arrCity=[];
        var obj = new Object();
        for(var i=0;i<data.length;i++){

            if(i>0 && obj.cityLetter!=data[i].cityLetter){
                obj.cityNames=arrCity;
                arr.push(obj);
                obj=new Object();
                arrCity=[];
            }
            obj.cityLetter=data[i].cityLetter;
            arrCity.push(data[i].cityName);
        }
        res.send({error:false,data:arr});

        res.end();
        }
    })
});
//brand
server.get('/brand',function(req,res){
    db.query('SELECT * FROM brand ORDER BY brandLetter,brandID',function(err,data){
        if(err){
            res.send({error:true,msg:"无法加载数据"})
        }else{
            res.send({error:false,data:data})
        }
        res.end();
    })

})



//banner
server.get('/banner',function(req,res){
    db.query('SELECT * FROM banner',function(err,data){
        if(err){
            res.send({error:true,msg:"无法加载数据"})
        }else{
            res.send({error:false,data:data})
        }
    })

})
//signin
server.get('/signin',function(req,res){
    db.query(`SELECT * FROM signin WHERE name='${req.query.user}'`,function(err,data){
        if(err){
            res.send({error:false,msg:'1'})
        }else{
            if(data.length>0){
                res.send({error:false,msg:'2'})
            }else{
                db.query(`INSERT INTO signin VALUES(0,'${req.query.user}','${req.query.pass}','${req.query.tel}')`,function(err,data){
                    if(err){
                        res.send({error:false,msg:'3'})
                    }else{
                        res.send({error:true})
                    }
                })
            }
        }
        res.end();
    })
})
//signup
server.get('/signup',function(req,res){
    db.query(`SELECT * FROM signup WHERE name='${req.query.user}'`,function(err,data){
        if(err){
            res.send({error:false,msg:''})
        }else{
            if(data.length==0){
                res.send({error:false,msg:''})
            }else{
                if(data[0].pass==req.query.pass){
                    res.send({error:true})
                }else{
                    res.send({error:false,msg:'用户名错误'})
                }
            }

        }
        res.end();
    })
})
//search brand
server.get('/sbrand',function(req,res){
    db.query(`SELECT * FROM brand WHERE brandLetter='${req.query.letter}' or brandName like '%${req.query.letter}%'`,function(err,data){
        if(err){
            res.send({error:true,msg:''})
        }else{
            res.send({error:false,data:data})
        }
        res.end();
    })
})

//price
server.get('/price',function(req,res){
    db.query('SELECT * FROM price',function(err,data){
        if(err){
            res.send({error:true,msg:"无法加载数据"})
        }else{
            res.send({error:false,data:data})
        }

    })

})
//che xing
server.get('/type',function(req,res){
    db.query('SELECT * FROM type',function(err,data){
        if(err){
            res.send({error:true,msg:"无法加载"})
        }else{
            res.send({error:false,data:data})
        }
    })

})
//forum
server.get('/forum',function(req,res){
    db.query('SELECT * FROM forum',function(err,data){
        if(err){
            res.send({error:true,msg:"无法加载"})
        }else{
            res.send({error:false,data:data})
        }
        res.end();
    })
})
///class特价好车
server.get('/getCarsByType',(req,res)=>{
    db.query(`SELECT * FROM carstore WHERE mark='${req.query.type}'`,function(err,data){
    if(err){
        res.send({error:true,msg:'哎呦，不行哦！'})
    }else{
        res.send({error:false,data:data})
    }
})
})




server.use(static('www'));















