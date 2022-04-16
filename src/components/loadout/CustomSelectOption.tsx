import { FormatProps } from "../../types/types";

export default function CustomSelectOption(props: FormatProps) {
  return (
    <div style={{ display: "flex" }}>
      <div>{props.label}</div>
      <div style={{ marginLeft: "10px", color: "#ccc" }}>{props.type}</div>
    </div>
  );
}
