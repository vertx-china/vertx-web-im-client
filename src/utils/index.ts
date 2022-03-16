export const getFormatMSG = (msg: VC.MSG): string => {

  if (Array.isArray(msg)) {
    return msg.reduce((a, b) => {
      if (typeof b.message === 'string') {
        return a += b.message
      } else {
        return '[不支持的消息类型]'
      }
    }, '')
  }

  if (typeof msg === 'object') {
    return msg.content
  }


  return msg
}
export const isUrl = (url: string) => {
  const reg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
  return reg.test(url)
}

class Socket {
  private scoket: WebSocket = WebSocket as any;
  url: string = '';
  connect = (url:string) => {
    this.scoket = new WebSocket(url);
    this.url = url;
    return this.scoket
  }

  reconnect = (url?: string)=>{
    if(this.scoket?.CLOSED || this.scoket?.CLOSING){
      this.scoket.close()
      console.log('重新链接')
      this.scoket = new WebSocket(this.url||url||'')
    }
  }

}

export const socketInst = new Socket()

export const socket = socketInst.connect("ws://103.145.87.185:32168");