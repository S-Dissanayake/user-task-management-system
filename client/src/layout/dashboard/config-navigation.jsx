import DashboardIcon from '../../assets/icons/dashboard.svg';
import LogoutIcon from '../../assets/icons/logout.svg';

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <img src={DashboardIcon}/>
  },
  {
    title: 'logout',
    path: '/',
    icon: <img src={LogoutIcon}/>
  }
];

export default navConfig;
