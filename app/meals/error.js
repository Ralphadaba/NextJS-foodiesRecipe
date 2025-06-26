'use client';   // why does this particular page require 'use client'? I don't see any browser feature here // It also checks for errors that happen on the client side -- 453

export default function Error() {  // we could receive 'error' as a prop to get error message. Check -- 453.
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
