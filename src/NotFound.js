import { useHistory } from "react-router-dom";
import "./NotFound.css"
function NotFound(props) {
    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }
    return (
        <div className="page">
            <div className="redBackground topSection">
                <h1>Page Not Found</h1>
            </div>
            <p>Oops, we can't seem to find the page you're looking for.</p>
            <div className="backButton" onClick={goBack}>Back</div>
        </div>
    );
}
export default NotFound;