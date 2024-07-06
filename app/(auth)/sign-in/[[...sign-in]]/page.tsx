// Importing the SignIn component from the @clerk/nextjs package
import { SignIn } from "@clerk/nextjs";

// Main Page component
export default function Page() {
  return (
    // Setting up the page to occupy the full screen using flexbox
    <div className='h-screen flex justify-center items-center'>
      {/* Rendering the SignIn component to allow users to sign in */}
      <SignIn />
    </div>
  );
}
