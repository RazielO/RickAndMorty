import { FaDizzy, FaRegQuestionCircle, FaGrin } from "react-icons/fa";

export const StatusIcon = (props: { status: "Dead" | "Alive" | "unknown" }) => {
  const { status } = props;

  if (status === "Dead") {
    return <FaDizzy className="text-red-500 inline" />;
  } else if (status === "unknown") {
    return <FaRegQuestionCircle className="text-yellow-500 inline" />;
  }
  return <FaGrin className="text-green-500 inline" />;
};
