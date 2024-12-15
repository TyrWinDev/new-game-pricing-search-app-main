import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">Game Price Search</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/top-deals">Top Deals</Link></li>
          <li><Link to="/random-deals">Random Deals</Link></li>
          <li><Link to="/auth">Login / Sign Up</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar