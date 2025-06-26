import MainHeader from '@/components/main-header/main-header';
import './globals.css';  // This import is made global because it is imported like this in the root layout.js file. This makes it apply to all components and pages

export const metadata = {   // check the documentation to know how to set meta data for facebook, google and the rest in Next js  --472
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <MainHeader /> 
        {children}
      </body>
    </html>
  );
}
