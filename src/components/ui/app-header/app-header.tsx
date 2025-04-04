import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { page } from '../../../utils/utils';
export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={page('/') ? 'primary' : 'secondary'} />
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
        </>
        <>
          <ListIcon type={page('/feed') ? 'primary' : 'secondary'} />
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={page('/profile') ? 'primary' : 'secondary'} />
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
