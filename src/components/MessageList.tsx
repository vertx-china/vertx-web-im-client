import React from "react";
import { useContext } from "react";
import { DataContext } from "./DataProvider";
import MessageItem from "./MessageItem";

const MessageList = React.forwardRef<HTMLDivElement>((props,listRef) => {
  const { data, clientID } = useContext(DataContext);

  // const listRef = useRef<HTMLDivElement>(null);

  const renderItem = () => {
    return data.map((item, index) => {
      const { timestamp, id } = item;
      return (
        <MessageItem
          data={item}
          key={id + timestamp + index}
          clientID={clientID}
        />
      );
    });
  };



  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
      }}
      ref={listRef}
    >
      {renderItem()}
    </div>
  );
});

export default MessageList;
