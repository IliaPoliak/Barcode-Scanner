import { useParams } from "react-router-dom";

const Item = () => {
  const { isbn } = useParams();
  return <div>Item: {isbn}</div>;
};
export default Item;
