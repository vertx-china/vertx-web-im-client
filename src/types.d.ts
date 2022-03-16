/**
 * {
  "message":{
    "type":"img",
    "base64":"<url>"
  }
}
 */

declare namespace VC {

  type MSG = string | 
  { message: string }[] | 
  { type: number| string; content: string }
  

  interface MSGStruct {
    message: MSG;
    nickname: string;
    id: string;
    time: string;
    generatorVerticleID?: string;
    timestamp: number
  }

  interface InitialState {
    data: MSGStruct[];
    clientID: string;
    userList: UserInfo;
  }

  type UserInfo = string[]

}