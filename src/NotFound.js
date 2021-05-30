import { useHistory } from "react-router-dom";
import "./NotFound.css"
function NotFound(props) {
    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }
    return (
        <div className="page" style = {{textAlign : "center"}}>
            <p>Oops, we can't seem to find the page you're looking for.</p>
            <button type = "button" onClick = {goBack}> Go Back </button>
        </div>
    );
}
export default NotFound;