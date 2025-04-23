import React from 'react';  
import { Outlet } from 'react-router-dom';
import './UserListingsPage.css';

  
const UserListingsPage: React.FC = () => {  
    
  
    return (  
        <div id="my-listings">
            <Outlet />
        </div>  
    );  
};  
  
export default UserListingsPage;