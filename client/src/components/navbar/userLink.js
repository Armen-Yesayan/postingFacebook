import {Link} from "react-router-dom";

const UserLink = ({logout}) => {
    return (
        <ul className="navbar-nav">
            <li className='nav-item'>
                <Link to="/profile" className="nav-link">
                    Profile
                </Link>
            </li>
            <li className='nav-item'>
                <a href="" onClick={logout} className="nav-link">
                    Logout
                </a>
            </li>
        </ul>
    )
}

export default UserLink;