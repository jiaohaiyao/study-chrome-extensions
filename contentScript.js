// 插入web的js，可与扩展程序通信操作都没
chrome.runtime.sendMessage({ msg: '您好' }, function(response) {
    console.log(response);
});
// 监听插件消息
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log('来自扩展程序', request.msg);
      // TODO sth
        if (request.msg === '修改背景') {
            var random = Math.floor(Math.random() * 6 + 1);
            
            document.body.style.background = 'url(' + chrome.extension.getURL('/img/bg' + random + '.jpg') + ') center / cover fixed'
            // 发送消息
            sendResponse({ msg: '完成修改'});
        }
        else if (request.msg === '修改字号') {
            document.documentElement.style.fontSize = '120px'
        }
    }
);