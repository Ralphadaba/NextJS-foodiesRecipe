import Image from "next/image";
import { notFound } from "next/navigation";

import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";

export async function generateMetadata({ params }) {
  // where is this called? -- Next js is looking for functions like this if it doesn't find any other metadata and if it finds one, it executes it for us.  // This is how we generate dynamic metadata as opposed to static obv  -- 473
  const meal = await getMeal(params.mealSlug);
  // const { mealSlug } = await params;
  // const meal = getMeal(mealSlug);

  if (!meal) {
    //another safety check against undefined errors be aware  -- check 473
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }) {
  const meal = await getMeal(params.mealSlug);
  // const { mealSlug } = await params;
  // const meal = getMeal(mealSlug);

  if (!meal) {
    notFound(); //This will stop the component from executing and show the closest not-found or error page  // //But error.js is closest?? check my q&a -- 456
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />"); // regular expression to fix line breaks -- 455

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={meal.image}
            // src={`https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
           by <a
              href={`mailto:${meal.creator_email}`} /**These names i.e. creator_email, creator are gotten from the initdb.js file  */
            >
              {meal.creator}
            </a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
