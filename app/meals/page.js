export const dynamic = 'force-dynamic';

import { Suspense } from 'react';  // 452 // below
import Link from 'next/link';

import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

export const metadata = {   // -- 472
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {  //used with Suspense to position the fallback message
  console.log('Fetching meals');
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p> 
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p> 
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}


/**
 * Suspense is a component provided by react that allows us to andle loading state and show fall back content until some data or resource has been loaded.
 * Suspense is shown or trigerred when there is a loading state. Alternatively, we could use loading.js in the file directory but we also need to position the 
 * fetching message the fallback message so at a particulr area of the page. loading.js will just position it at the top.
 * 
 */
