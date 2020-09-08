(function() {
    // 监听tab发送过来的消息
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log('来自脚本', request.msg);
          // TODO sth
          // 发送消息
          sendResponse({ msg: '好的'});
        }
    );
    var sendMsg = function(msg) {
        // 点击button 向web页面发送消息，需要先获取tab的ID
        chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
            //向tab发送请求 需要指定tab id
            chrome.tabs.sendMessage(tab[0].id, {
              msg,
              data: []
            }, function(response) {
              console.log(response);
            });
        });
    }
    var creatQrcode = function(content) {
        document.getElementById('qrcode').setAttribute('src', 'https://api.pwmqr.com/qrcode/create?url=' + content);
    }
    document.getElementById('btn1').addEventListener('click', function() {
        sendMsg('修改背景')
    });
    document.getElementById('btn2').addEventListener('click', function() {
        sendMsg('修改字号')
    });
    document.getElementById('btn3').addEventListener('click', function() {
        chrome.tabs.getSelected(null, (tab) => {
            console.log(tab.url)
            document.getElementById('content').value = tab.url;
            creatQrcode(tab.url)
        });
    });
    document.getElementById('content').addEventListener('keydown', function(e) {
        // 获取web页面地址栏的URL
        setTimeout(function() {
            creatQrcode(e.target.value)
        }, 100)
    });
    chrome.tabs.getSelected(null, (tab) => {
        document.getElementById('content').innerHTML = tab.url;
        creatQrcode(tab.url)
    });
})()
