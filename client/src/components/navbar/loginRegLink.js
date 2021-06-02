import {Link} from "react-router-dom";

const LoginRegLink = () => {
    return (
        <ul className="navbar-nav">
            <li className='nav-item'>
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            </li>
            <li className='nav-item'>
                <Link to="/register" className="nav-link">
                    Register
                </Link>
            </li>
        </ul>
    )
}

export default LoginRegLink;