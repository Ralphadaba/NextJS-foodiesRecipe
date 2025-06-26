'use client';

import { useFormStatus } from 'react-dom';  // 465

export default function MealsFormSubmit() { 
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}
