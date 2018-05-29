import styled from "react-emotion";
import { generateColor } from "../utils/colorHelpers";

export const Avatar = styled("div")(
  {
    height: "50px",
    width: "50px",
    backgroundColor: "#666",
    borderRadius: "50%",
    backgroundSize: "contain"
  },
  ({ url, userName = "" }) => ({
    backgroundColor: generateColor(userName),
    backgroundImage: url && `url(${url})`
  })
);
