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


export const socket = new WebSocket("ws://103.145.87.185:32168");