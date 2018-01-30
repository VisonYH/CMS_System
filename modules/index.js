window.onload = function() {
    
    var list = document.getElementsByClassName('list-content')[0];
    var domTemp = document.createDocumentFragment();
    sendAjax({
        url: '/getUserList',
        success: function(jsonData) {         
            for(var i in jsonData) {
                var str = '';
                if (jsonData.hasOwnProperty(i)) {
                    str += ('<span class="item w50" >' + jsonData[i]['id'] + '</span>');
                    str += ('<span class="item w200" >' + jsonData[i]['name'] + '</span>');
                    str += ('<span class="item w50" >' + jsonData[i]['age'] + '</span>');
                    str += ('<span class="item w200" >' + jsonData[i]['phone'] + '</span>');
                    str += ('<span class="item w250" >' + jsonData[i]['address'] + '</span>');
                    str += ('<span class="item w150" > <a class="modify" href="add.html?id=' + jsonData[i]['id'] + '">修改</a>&nbsp;&nbsp;<a href="javascript:;" class="delete">删除</a></span>');
                }
                var li = document.createElement('li');
                li.innerHTML = str;
                domTemp.appendChild(li);
            }
            list.appendChild(domTemp);
        }
    });
    var toModify = document.getElementsByClassName('modify');
    var toDelete = document.getElementsByClassName('delete');
    

    list.onclick = function(event) {
        event = event || window.event;
        target = event.target || event.srcElement;
        objId = Number(target.parentNode.parentNode.children[0].innerHTML);
        if (target.innerHTML === '删除' && target.tagName.toLowerCase() === 'a') {            
            
            var res = window.confirm('确定要删除Id为' + objId + '这个客户吗？');
            if (!res) {return;}
            sendAjax({
                url: '/delete' + '?id=' + objId,
                success: function(jsonData) {
                    if (jsonData.code === 0) {
                        alert(jsonData.message);
                        list.removeChild(target.parentNode.parentNode);
                    } else {
                        alert(jsonData.message);
                    }
                }
            });
        } 
    }

}