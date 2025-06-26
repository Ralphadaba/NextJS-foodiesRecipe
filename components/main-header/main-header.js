import Link from 'next/link';
import Image from 'next/image';  // 442
// import { usePathname } from 'next/navigation'; //447

import MainHeaderBackground from './main-header-background';
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';  // 441 
import NavLink from './nav-link';  // IDG this Nav link and the usage of href here

export default function MainHeader() {
 //const path = usePathname(); //uePathname only works in client components so we'd have to add 'use client' but we didn't do that cause... //check 447 for how he used this

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}


/**
 * The priority feature is used with images to load them immediately, ignoring lazy loading. This is useful for images that must appear as soon as the page loads (e.g., logos, hero images).
 * 
 */