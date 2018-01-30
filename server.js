var http = require('http');
var url = require('url');
var fs = require('fs');
var customer = require('./modules/customer.js');


var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url, true);
    pathname = urlObj.pathname;
    query = urlObj.query;
   
    var reg = /\.(HTML|JS|CSS|TXT|JSON|JPG|JPEG|PNG|GIF|BMP|ICO|SVG)/i;
    
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toLowerCase();
        
        var suffixMIME = 'text/html';
        switch(suffix){
            case 'css':
                suffixMIME = 'text/css';
                break;
            case 'js':
                suffixMIME = 'text/javascript';
                break;
        }
        try{
          //  console.log(pathname);
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            res.writeHead(200, {'content-type': suffixMIME + '; charset = utf-8'});
            res.end(conFile);
        } catch(e) {
            res.writeHead(404);
            res.end('Not Found!');
        }
    }

    var content = null;
    // 获取全部用户信息
    if (pathname === '/getUserList') {
        content = customer.getUserList();
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(content);
        return;
    }

    // 获取所需用户信息
    if (pathname === '/getData') {
        content = customer.getUser(query['id']);
        res.writeHead(200, {'content-type': 'application/json; charset=utf-8;'});
        res.end(JSON.stringify(content));
        return;
    }

    // 添加用户信息
    var temp = '';
    if (pathname === '/add') {
        req.addListener('data', function(chunk) {
            temp += chunk;
        });
        req.addListener('end', function() {
            //console.log(temp);
            temp = JSON.parse(temp);
            
            temp['name'] = temp['name'] || '珠峰培训';
            temp['age'] = temp['age'] || '23';
            temp['phone'] = temp['phone'] || '13041086186';
            temp['address'] = temp['address'] || '湖北省武汉市';

            content = customer.addUser(temp);
            res.writeHead(200, {'content-type': 'application/json; charset = utf-8'});
            res.end(content);
        });
        return;
    }

    // 删除用户信息
    if (pathname === '/delete') {
        content = customer.deleteUser(query['id']);
        res.writeHead(200, {'content-type': 'application/json; charset = utf-8'});
        res.end(content);
        return;
    }

    // 更新用户信息
    var temp = '';
    if (pathname === '/update') {
        req.addListener('data', function(chunk) {
            temp += chunk;
        });
        req.addListener('end', function() {
            var user = JSON.parse(temp);
            content = customer.updateUser(user);
            res.writeHead(200, {'content-type': 'application/json; charset= utf-8'});
            res.end(content);
        });
        return;
    }

});

server.listen(8080, function() {
    console.log('server is listening at 8080!');
})