import styled from "@emotion/styled";
import { Image } from "@mui/icons-material";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { socket } from "../utils";
import { DataContext } from "./DataProvider";

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

const MSGEditor = () => {
  const { clientID } = useContext(DataContext);

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

  const handleClick = () => {
    const result: VC.MSGStruct = {
      message: content,
      nickname: "guest-web",
      id: clientID,
      time: new Date().toDateString(),
      timestamp: Date.now(),
    };
    if (content) socket.send(JSON.stringify(result));
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="消息内容...."
        />
      </div>
      <div className="operator">
        <ButtonGroup>
          <Button onClick={handleClick} size="small">
            send
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default MSGEditor;
