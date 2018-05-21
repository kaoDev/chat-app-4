import * as React from "react";
import styled from "react-emotion";

const Wrapper = styled("div")({
  display: "flex",
  width: "100%",
  position: "relative",
  marginBottom: "14px",
  marginTop: "10px"
});

const Textarea = styled("textarea")({
  backgroundColor: "#424242",
  color: "rgba(255, 255, 255, 0.8)",
  marginLeft: "10px",
  fontSize: "14px",
  padding: "8px 16px",
  border: "none",
  outline: "none",
  flex: 1,
  borderRadius: "8px"
});

const SendButton = styled("button")({
  marginLeft: "16px",
  backgroundColor: "#2518c6",
  color: "white",
  cursor: "pointer",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  fontWeight: "bold",
  ":hover": {
    backgroundColor: "#4538e6"
  },
  ":active,:focus": {
    color: "#e41200",
    backgroundColor: "#4538e6"
  }
});

export class MessageInput extends React.Component {
  state = {
    currentMessage: ""
  };

  sendMessage = () => {
    const { currentMessage } = this.state;
    const { onSend } = this.props;

    // trim() removes leading and trailing whitespaces
    const messageToSend = currentMessage.trim();
    // only send the message when it has text
    if (messageToSend.length > 0) {
      onSend(messageToSend);
      this.setState({ currentMessage: "" });
    }
  };

  render() {
    const { currentMessage } = this.state;

    return (
      <Wrapper>
        {/* 
        for the sake of simplicity place the 
        message in put on top of the message history 
        */}
        <Textarea
          placeholder={"write a message..."}
          value={currentMessage}
          onChange={event =>
            this.setState({ currentMessage: event.currentTarget.value })
          }
        />
        <SendButton onClick={this.sendMessage}>send</SendButton>
      </Wrapper>
    );
  }
}
