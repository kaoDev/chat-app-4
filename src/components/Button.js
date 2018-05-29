import styled from "react-emotion";

export const Button = styled("button")({
  height: "48px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  fontWeight: "bold",
  backgroundColor: "#2518c6",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  ":hover": {
    backgroundColor: "#4538e6"
  },
  ":active,:focus": {
    color: "crimson",
    backgroundColor: "#4538e6"
  }
});
