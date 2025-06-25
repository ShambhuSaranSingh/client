import { Link } from "react-router-dom";
function Home(){
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of our application.</p>
            <Link to="/">Home</Link>
            <Link to="/login">Go to Login</Link>
        </div>
    );
}
export default Home;
   