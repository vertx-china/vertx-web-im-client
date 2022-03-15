import { useContext } from "react";
import { DataContext } from "./DataProvider";
import MessageItem from "./MessageItem";

const MessageList = () =>{

  const {data,clientID} = useContext(DataContext);  
  
  const renderItem = () =>{
    return data.map((item,index)=>{
      const {timestamp,id} = item;
      return <MessageItem data={item} key={id+ timestamp+index} clientID={clientID}  />
    })
  }

  return <div style={{
    flex:1,
    overflow:'auto'
  }}>{renderItem()}</div>
}

export default MessageList;