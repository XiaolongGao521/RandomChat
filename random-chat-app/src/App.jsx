import * as React from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Dimensions, View } from 'react-native-web';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import { getAIResponse } from './chat-gpt-client';

const {height, width} = Dimensions.get('window');

function App() {
  const [dimensions, setDimensions] = React.useState({
    height: height, width: width
  });

  const [messages, setMessages] = React.useState([]);

  async function onSend(innerHtml, textContent, innerText, nodes) {
    const messagesWithUserMessage = messages.concat([{message: textContent, direction: "outgoing"}])
    setMessages(messagesWithUserMessage)
    const aiResponse = await getAIResponse(textContent)
    setMessages(messagesWithUserMessage.concat([{message: aiResponse, direction: "incoming"}]))
  }

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }) => {
        setDimensions({window});
      },
    );
    return () => subscription?.remove();
  });

  return (
    <View style={{height: dimensions.height}}>
      <MainContainer>
        <ChatContainer>       
          <MessageList>
            {messages.map((message) => {return <Message model={message}/>})}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={onSend}/>        
        </ChatContainer>
      </MainContainer>
    </View>
  )
}

export default App
