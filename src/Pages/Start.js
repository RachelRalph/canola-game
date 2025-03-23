import '../App.css';
import { Link } from "react-router";

const Start = () => {
  return (
      <div className = {"start_div"}>
        <Link to = "slide" className = "start_button">START!!</Link>
    </div>
  );
}

export default Start;
