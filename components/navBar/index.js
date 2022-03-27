import styles from './NavBar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { activeNavItem, toggleNavSM } from '../../redux/navActiveSlice';
import { MenuRounded, CloseRounded } from '@mui/icons-material';
import { logo } from '../../images';

const navList = ["home", "movies", "series", "people", "browse"]

const NavBar = () => {

    const { current, logo_sm, nav_sm } = useSelector((state) => state.navActivate);
    const dispatch = useDispatch();

    function toggleHandler() {
        dispatch(toggleNavSM());
    }

    const navItems = navList.map(item => {
        let path;
        if (item === "home") {
            path = "/";
        } else {
            path = `/${item}`;
        }
        return (
            <li onClick={() => {
                dispatch(activeNavItem(item));
                toggleHandler();
            }
            } key={navList.indexOf(item)} className={current === item ? `${styles.nav_item} ${styles.active}` : `${styles.nav_item}`}>
                <Link href={path}>
                    {item}
                </Link>
            </li>
        )
    });

    return (
        <nav className={logo_sm ? `${styles.nav_bar} ${styles.nav_small}` : `${styles.nav_bar}`}>
            <div className={`${styles.container_x_sm} ${styles.container_y_1}`}>
                <div className={styles.flex_box}>

                    <Link href="/" onClick={() => dispatch(activeNavItem("home"))}>
                        <div className={logo_sm ? `${styles.logo} ${styles.logo_small}` : `${styles.logo}`}>
                            <Image src={logo} layout="intrinsic" alt="CINE logo" />
                        </div>                        
                    </Link>

                    <div className={styles.nav_list}>
                        <ul className={nav_sm ? `${styles.nav_items} ${styles.active}` : `${styles.nav_items}`}>
                            {navItems}
                        </ul>

                        <button onClick={toggleHandler} className={`${styles.hide_on_desktop} ${styles.menu_btn}`}>
                            {
                                nav_sm ? <CloseRounded fontSize='large' /> :
                                    <MenuRounded fontSize='large' />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;