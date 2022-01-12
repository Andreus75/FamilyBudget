import './Header.css'
import {Link} from "react-router-dom";

export default function Header () {
    return (
        <div className="header">
            <div className="container_header">
                <a href="/" className="logo">LOGO</a>
                <div className="name_application">Family Budget</div>
                <div className={"header_nav"}>
                    <Link to={'/rules'}>Rules</Link>
                    <br/>
                    <Link to={'/contacts'}>Contacts</Link>
                    <Link to={'/createFamily'}>
                        <button className='button_create_family'>Create new family</button>
                    </Link>
                    <Link to={'/registration'}>
                        <button className='button_registration'>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
