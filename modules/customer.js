var fs = require('fs');
//编写接口


//获取全部用户信息
function getUserList() {
    var content = fs.readFileSync('./modules/customerInfo.json','utf-8');
    return content;
}
// 根据id获取用户信息
function getUser(id) {
    var content = fs.readFileSync('./modules/customerInfo.json', 'utf-8'); 
    content = (content === '') ? []:JSON.parse(content);
    var res = null;
    //console.log(content);
    for(var i = 0; i < content.length; i++) {
        var curId = content[i]["id"];
        if(id == curId) {
            res = content[i];
            break;
        }
    }
    if (!res) {
        res = {
            code: 1,
            message: '当前用户不存在！',
            data: null
        };
    } else {
        res = {
            code: 0,
            message: '获取成功！',
            data: res
        };
    }
    return res;
}

// 新增用户信息
function addUser(user) {
    var content = fs.readFileSync('./modules/customerInfo.json', 'utf-8');
    content = (content === '') ? []:JSON.parse(content);
    if (content.length === 0) {
        user.id = 1;
        content.push(user);
    } else {        
        user.id = Number(content[content.length - 1]['id']) + 1;
        content.push(user);
    }
    fs.writeFileSync('./modules/customerInfo.json', JSON.stringify(content));
    var res = {
        code: 0,
        message: '添加成功！',
        data: ''
    };  
    return JSON.stringify(res);
}
 // 删除用户信息
 function deleteUser(id) {
    var content = fs.readFileSync('./modules/customerInfo.json', 'utf-8');
    content = (content === '') ? [] : JSON.parse(content);
    var flag =false;
    var res = null;
    for(var i = 0; i < content.length; i++) {
        var temp = content[i];
        if (id == temp['id']) {
            content.splice(i, 1);
            fs.writeFileSync('./modules/customerInfo.json', JSON.stringify(content));
            flag = true;
            break;
        }
    }
    if (!flag) {
        res = {
            code: 1,
            message: '删除失败，未找到该用户！',
            data: null
        };
    } else{
        res = {
            code: 0,
            message: '删除成功！',
            data: null
        };
    }
    return JSON.stringify(res);
 }

// 更新用户信息
function updateUser(user) {
    var content = fs.readFileSync('./modules/customerInfo.json','utf-8');
    content = (content === '') ? [] : JSON.parse(content);
    var flag = false;
    
    for(var i in content) {
        var temp = content[i];
        if (content.hasOwnProperty(i)) {
            if (user['id'] == temp['id']) {
                for (var j in temp) {
                    if (temp.hasOwnProperty(j)) {
                        temp[j] = user[j] || temp[j];
                    }
                }
                content[i] = temp;
                flag = true;
                fs.writeFileSync("./modules/customerInfo.json", JSON.stringify(content));
                break;
            }
            
        }
        
    }
    var res = {
        code: 0,
        message: '修改成功！',
        data: null
    } 
    if(!flag) {
        res = {
            code: 1,
            message: '修改失败，查无此人！',
            data: null
        };
        
    } 

    return JSON.stringify(res);
}

module.exports = {
    getUserList: getUserList,
    getUser: getUser,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};