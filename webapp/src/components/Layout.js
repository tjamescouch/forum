import NavBar from './NavBar'

import './Layout.css'

function Layout (props) {
  return (
    <div className="Layout">
      <NavBar />
      <div className="Layout-content">
        {props.children}
      </div>
    </div>
  );
}


export default Layout;
