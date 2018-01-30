(function(){
    function createXHR() {
        var xhr = null;
        var flag = false;
        var arr = [
            function(){
                return new XMLHttpRequest;
            },
            function() {
                return new ActiveXObject('Microsoft.XMLHTTP');
            },
            function() {
                return new ActiveXObject('Msxml12.XMLHTTP');
            },
            function() {
                return new ActiveXObject('Msxml13.XMLHTTP');
            }
        ];
        for(var i =0; i < arr.length; i++) {
            var temp = arr[i];
            try{
                xhr = temp();
                flag = true;
                break;
            } catch(e) {
    
            }
        }
        if (!flag) {
            throw new Error('your browser is not support ajax, please update it!');
        }
        return xhr;
    }
    
    
    var sendAjax = function(options) {
        var _default = {
            url: "",
            type: "get",
            async: true,
            data: null,
            dataType: 'json',
            success: null
        };
        for (var optionItem in _default) {
            if (options.hasOwnProperty(optionItem)) {
                _default[optionItem] = options[optionItem];
            }
        }
        var xhr = createXHR();
        if (_default['type'].toLowerCase() === 'get') {
            _default['url'] = _default['url'].indexOf('?') > -1 ?  (_default['url'] + '&' + Math.random()):(_default['url'] + '?' + Math.random());
        }
        xhr.open(_default['type'], _default['url'], _default['async']);
        xhr.onreadystatechange = function() {
			
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {     			
                var data = 'json' in window ? JSON.parse(xhr.responseText) : eval('(' + xhr.responseText + ')');
                _default["success"] && _default["success"](data);      
            }
        }
        xhr.send(_default['data']);
    }
    window.sendAjax = sendAjax;
})();