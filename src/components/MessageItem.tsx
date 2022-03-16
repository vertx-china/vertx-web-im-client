import styled from "@emotion/styled";
import { useMemo } from "react";
import { getFormatMSG, isUrl } from "../utils";

interface Props {
  data: VC.MSGStruct;
  clientID: string;
}

const Container = styled.div<{ isSelf: boolean }>`
  position: relative;
  width: 100%;
  min-height: 44px;
  display: flex;
  margin: 5px 0px;
  align-items: flex-start;
  justify-content: ${({isSelf})=> !isSelf ? 'flex-start':"flex-end"};
  .avatar-contaienr{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    .avatar{
      box-sizing: border-box;
      color: ${({isSelf})=> isSelf ? '#fff':"#222"};
      font-size: 16px;
      font-weight: 900;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 34px;
      width: 34px;
      border-radius: 5px; 
      background-color: ${({ isSelf }) => (isSelf ? "#00AB55" : "#fff")};
      border: ${({isSelf})=> isSelf ? '0px':"2px solid #007B55"};
    }
  }
  
  .MSG-container{
    flex: 1;
    display: block;
    .nick-name{
      font-size: 12px;
      color: #222;
      width: 100%;
    }
    .msg{
      display: inline-block;
      padding: 3px 5px;
      border-radius: 8px;
      background-color: ${({ isSelf }) => (isSelf ? "#00AB55" : "#007B55")};
      max-width: 70vw;
      color: #fff;
      img{
        width: 300px;
      }
    }
  }

`;

const MessageItem: React.FC<Props> = ({ clientID, data }) => {
  const { nickname, id, message } = data;

  const msg = useMemo(() => {
    const result = getFormatMSG(message);
    
    return isUrl(result) ? <img src={result} alt={result}/> : result
  }, [message]);

  const avatar = useMemo(() => String(nickname).split("")[0], [nickname]);

  const isSelf = clientID === id;

  return (
    <Container isSelf={isSelf}>

      <div className="avatar-contaienr">
        <div className="avatar">{avatar}</div>
      </div>
      <div className="MSG-container">
        <div className="nick-name">{nickname}</div>
        <div className="msg">{msg}</div>
      </div>
    </Container>
  );
};

export default MessageItem;
