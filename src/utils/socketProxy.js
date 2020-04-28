/*
	通信协议：
	{
		type: String,
		msg: Object
	}
	订阅：
	{
		type: "subscribe",
		msg:{
			topic: "xxx-data"
		}
	}
	取消订阅：
	{
		type: "unsubscribe",
		msg:{
			topic: "xxx-data"
		}
	}
	数据：
	{
		type: "xxx-data",
		msg: {
			……(自定义)
		}
	}
*/

const EventEmitter = require('events').EventEmitter

class Message {
  constructor(type, msg) {
    this.type = type
    this.msg = msg
  }
}

class WebSocketProxy extends WebSocket {
  constructor(url) {
    super(url)
    this.emitter = new EventEmitter()
    this.onmessage = (e) => {
      console.log(e.data)
      const msg = JSON.parse(e.data)
      this.emitter.emit(msg.type, msg)
    }
  }
  // 订阅
  subscribe(topic) {
    const subMsg = new Message('subscribe', {
      'topic': topic
    })
    this.send(subMsg)
  }
  // 取消订阅
  unsubscribe(topic) {
    const unsubMsg = new Message('unSubscribe', {
      'topic': topic
    })
    this.send(unsubMsg)
  }
  // 监听数据
  on(topic, listener) {
    this.emitter.on(topic, listener)
  }
  // 移除监听
  removeListener(topic, listener) {
    this.removeListener(topic, listener)
  }
}

// 示例
/*
	let ws = new WebSocketProxy('ws://127.0.0.1:3000');
	ws.onopen = function(){
		ws.subscribe("xxx");
	}
	let listener = function(msg){
		console.log(msg); //已经去除掉了type
	}
	ws.on('xxx',listener);
*/

module.exports = WebSocketProxy
