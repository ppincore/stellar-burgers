import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const page = (pageName: string): boolean =>
    pageName === '/'
      ? location.pathname === pageName
      : location.pathname.includes(pageName);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon type={'primary'} />
            <Link
              to='/'
              className={clsx({
                [styles.link_active]: page('/'),
                [styles.link]: !page('/')
              })}
            >
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </Link>
          </>
          <>
            <ListIcon type={'primary'} />
            <Link
              to='/feed'
              className={clsx({
                [styles.link_active]: page('feed'),
                [styles.link]: !page('feed')
              })}
            >
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </Link>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <Link
            to='/profile'
            className={clsx({
              [styles.link_active]: page('profile'),
              [styles.link]: !page('profile')
            })}
          >
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
