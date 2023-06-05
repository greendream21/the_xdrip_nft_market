import React from 'react';
import SideBar from '../components/NavBar/SideBar'; 

export default function SideBarTest() {
  const [openSideMenu, setOpenSideMenu] = React.useState(false);

  return (
    <div>
      <button onClick={() => setOpenSideMenu(!openSideMenu)}>Toggle Sidebar</button>
      <SideBar openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
    </div>
  );
}
