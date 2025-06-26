'use client';

import { useFormState } from 'react-dom'; // below  --467

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { message: null });   // -- 467 explains it well  //Basically the 2, sM and mes... are the state updating func and the initial state respectively.

 // Next.js way of handling form submissions we're using use client at the top and we can't run server... in client components -- 461
  // async function shareMeal(formData) {
  //   'use server'; //vd461 This sets the function to only execute on the server  // just like 'use client' for client, use server creates a server action which is a function that's guaranteed to execute on the server only
  //   const meal = {
  //     title: formData.get('title'),  //'title' is gottn from the name prop in the title input
  //     summary: formData.get('summary'),
  //     instructions: formData.get('instructions'),
  //     image: formData.get('image'),
  //     creator: formData.get('name'),
  //     creator_email: formData.get('email')
  //   }
  // }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit /> 
          </p>
        </form>
      </main>
    </>
  );
}


/**
 * useFormState works a little bit like useState. It's used for managing the state of the server... of the form page. It receives 2 arguements
 * The first is the actual server action to be triggered when the form is submitted. The second arg is the initial state of the component.
 * 
 * I think what differentiates it from the useActionState react provides is is that this one if for the server... not sure, ask chat
 * 
 */