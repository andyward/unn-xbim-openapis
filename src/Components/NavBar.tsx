import { NavLink  } from 'react-router-dom';

export const NavBar = () => {
 return (
   <div>
      <nav>
      <div className="nav-items container">

            <div className="logo">
						<a href="/">
                     <img src="/xBim_parent_logo-01.png" alt="xbim Logo" height={32}/>
							<h1>Flex Building Viewer</h1>
						</a>
					</div>
            <ul>
               <li>
                  <NavLink  to="/">Home</NavLink>
               </li>
               <li>
                  <NavLink  to="/about">About</NavLink >
               </li>
               <li>
                  <NavLink  to="/models">Models</NavLink >
               </li>
            </ul>
         </div>
      </nav>
   </div>
 );
};

