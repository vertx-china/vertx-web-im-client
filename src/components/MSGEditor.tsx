import styled from "@emotion/styled";
import { Image } from "@mui/icons-material";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { socket } from "../utils";
import { DataContext, DispatchContext } from "./DataProvider";

const Container = styled.div`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: -2px 0px 5px rgb(0 0 0 / 10%);
  .tools-bar {
    height: 44px;
    width: 100%;
  }
  textarea {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 200px;
    padding: 5px;
  }
  .operator {
    width: 100%;
    height: 44px;
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
  }
`;

const MSGEditor: React.FC<{ handleScroll: any }> = ({ handleScroll }) => {
  const { clientID } = useContext(DataContext);
  const dispatch = useContext(DispatchContext);

  const [isFocus, setFocus] = useState(false);
  const [isOpen, setOpen] = useState(true);

  const [content, setContent] = useState<string>("");

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e: any) => {
    const files = (Array.from(e.target.files) || [e.target.file]) as File[];
    files.forEach((item) => {
      const reader = new FileReader();
      console.log(item);

      reader.readAsDataURL(item);
      reader.onload = function () {
        console.log(reader.result);
        const result: VC.MSGStruct = {
          message: reader.result?.toString() || "【不支持的消息内容】",
          nickname: "guest-web",
          id: clientID,
          time: new Date().toDateString(),
          timestamp: Date.now(),
        };
        socket.send(JSON.stringify(result));
      };
    });
  };

  const handleSend = (val?: VC.MSG) => {
    const message = val || content;
    
    if(typeof message === 'string' && !message.replace('\n','').replace(' ','')){
      //Don't send the message when it only has Space
      return;
    }
    const result: VC.MSGStruct = {
      message,
      nickname: localStorage.getItem('nickname') || 'guest-name',
      id: clientID,
      time: new Date().toDateString(),
      timestamp: Date.now(),
    };
    if (content) {
      dispatch({
        type: "setMSGData",
        payload: result,
      });
      socket.send(JSON.stringify(result));
      setContent("");
      handleScroll();
    }
  };

  const handleClick = () => {
    handleSend();
  };

  const handleKeyPress = (e: any) => {
    // console.log(e);
    if (e.key === "Enter" && isFocus) {
      handleSend(e.target.value);
    }
  };

  return (
    <Container>
      <div className="tools-bar">
        <label htmlFor="icon-button-file" style={{ position: "relative" }}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <Image />
          </IconButton>
          <input
            multiple
            id="icon-button-file"
            size={1024 * 64}
            accept="image/*"
            type="file"
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              opacity: 0,
            }}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <textarea
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyUp={handleKeyPress}
          value={content}
          style={isOpen ? {} : { height: "0px", position: "absolute",visibility:'hidden' }}
          onChange={(e) => setContent(e.target.value)}
          placeholder="消息内容...."
        />
      </div>
      <div className="operator">
        <ButtonGroup>
          <Button onClick={handleClick} size="small">
            send
          </Button>
          <Button
            onClick={() => setOpen(!isOpen)}
            variant={isOpen ? "outlined" : "contained"}
            size="small"
          >
            Collpase editor
          </Button>
          <Button onClick={handleScroll} size="small">
            Go Bottom
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default MSGEditor;
