/**
 * {
  "message":{
    "type":"img",
    "base64":"<url>"
  }
}
 */

declare namespace VC {

  interface TextMSG {
    type: 0,
    content: string;
  }

  interface ImageMSG {
    type: "img";
    url?: string;
    base64?: string;
  }

  interface AudioMSG {
    type: "audio";
    url: string;
  }

  interface VideoMSG {
    type: "video";
    url: string;
  }
  interface LinkMSG {
    type: "link";
    url: string;
    content: string;
  }

  type MixinMSG = TextMSG | ImageMSG | LinkMSG | AudioMSG | VideoMSG

  type RichTextMSG = MixinMSG[];



  interface HistoryMSG{
    type: "history";
    content: MixinMSG[]
  }

  type MSG = string | MixinMSG | RichTextMSG | HistoryMSG;


  interface MSGStruct {
    message: MSG;
    nickname: string;
    id: string;
    time: string;
    generatorVerticleID?: string;
    color?: string;
    timestamp: number
  }

  interface InitialState {
    data: MSGStruct[];
    clientID: string;
    userList: UserInfo;
  }

  type UserInfo = string[]

}