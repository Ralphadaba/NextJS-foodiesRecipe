'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {  //just like ActionState
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (         // we neeed to also do server side validation... 466
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);
  revalidatePath('/meals');  // This tells Next js to revalidate the cache that belongs to a certain route path // --468 & 469
  redirect('/meals');
}


/**
 * Next.js does aggressive caching on the server development after we have built the code(npm run build)revalidate means Next.js 
 * throws away the cache thats associated with the pages specified so it can refetch the data -- ask chat though  --468 & 469
 * 
 */