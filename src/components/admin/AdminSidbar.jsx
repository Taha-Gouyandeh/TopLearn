import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    const location=useLocation()
    return ( 
        <div>
            <ul className='nav navbar-nav side-nav' style={{height:'100vh'}}>
            <li className={location.pathname==='/dashboard'?'active':''}>
                    <Link to='/dashboard'><i className='fa fa-fw fa-dashboard'></i>داشبورد</Link>
                </li>
                <li className={location.pathname==='/dashboard/course'?'active':''}>
                    <Link to='/dashboard/course'><i className='fa fa-fw fa-graduation-cap'></i>دوره ها</Link>
                </li>
                
            </ul>
        </div>
     );
}
 
export default AdminSidebar;