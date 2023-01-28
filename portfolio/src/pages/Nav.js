import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <p><Link to="/">Home</Link> | <Link to="/projects">Projects</Link></p>
        </>
    )
}

export default Nav;