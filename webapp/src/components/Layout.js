import NavBar from './NavBar'

function Layout (props) {
  return (
    <div className="App">
      <NavBar />
      <div className="App-content">  
        {props.children}
      </div>
    </div>
  );
}


export default Layout;
