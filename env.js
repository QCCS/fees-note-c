var fs = require('fs');
const readline = require('readline');
var exec = require('child_process').exec;
var process = require('process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//读取问题
rl.question('请输入环境dev,test,pro: ', function(answer) {
    writeTarget(answer);
    rl.close();
});

//读取整行内容
// rl.on('line', function (input) {
//     writeTarget(input,fs);
//     rl.close();
// });

rl.on('close', function() {
    //在写文件之前，不能退出，否则无法写入文件
   // process.exit(0);
});

function writeTarget(name) {
    if(name != "dev" && name != "pro" && name != "test"){
        console.log("输入无法识别，默认 pro");
        // 默认pro
        name = "pro";
    }
    console.log("正在为你生成打包环境：");
    var t = fs.readFileSync("src/providers/config/"+name+".ts");
    fs.writeFile("src/providers/constants.ts", t, function (e) {
        console.log("生成完毕");
        getPackage();
        //进程退出
        //process.exit(0);
        if (e) {
            throw e;
        }
    })
}

function getPackage() {
    console.log("开始打包，请等待...");
    var cmdStr = 'npm run package';
    //TODO
    //这个地方是子进程，看不清终端输出
    exec(cmdStr, function(err,stdout,stderr){
        if(err) {
            console.log(' error:'+stderr);
        } else {
            console.log(stdout);
        }
    });
}
