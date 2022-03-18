export const getFormatMSG = (msg: VC.MSG):any => {
  if (Array.isArray(msg)) {
    return msg.map(getFormatMSG);
  }

  if (typeof msg === "string") {
    return isUrl(msg) ? <img src={msg} alt={msg}/> : msg;
  }

  const { type } = msg;

  switch (type) {
    case "img": {
      const { url, base64 } = msg;
      return <img src={url || base64} alt={url || base64} />;
    }

    case "link": {
      const { content, url } = msg;
      return <a href={url}>{content}</a>;
    }

    case 0:{
      return msg.content
    }

    case 'history':{
      return msg.content.map(getFormatMSG)
    }

    case 'audio':{
      return <audio src={msg.url} crossOrigin="anonymous" controls />
    }

    case 'video':{
      return <video controls src={msg.url} crossOrigin=""  />
    }

    default:
      return "【不受支持的消息类型】";
  }
};

export const isUrl = (url: string) => {
  const reg =
    /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
  return reg.test(url);
};

class Socket {
  private scoket: WebSocket = WebSocket as any;
  private url: string = "";
  private timer: any = 0;
  connect = (url: string) => {
    this.scoket = new WebSocket(url);
    this.url = url;
    return this.scoket;
  };

  reconnect = (url?: string) => {
    this.timer = setTimeout(() => {
      this.timer && clearTimeout(this.timer);
      if (this.scoket?.CLOSED || this.scoket?.CLOSING) {
        this.scoket.close();
        console.log("重新链接");
        this.scoket = new WebSocket(this.url || url || "");
      }
    }, 1000);
  };
}

export const socketInst = new Socket();

export const socket = socketInst.connect("ws://103.145.87.185:32168");
