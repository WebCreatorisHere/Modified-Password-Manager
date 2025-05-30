import React from "react";
import Addcard from "@/components/addcard";
import Addpassword from "@/components/addpassword";
import CardsList from "@/components/cardlist";
import PasswordsList from "@/components/passwordlist";
import Cardsloader from "@/components/cardsloader";
import Navbar from "@/components/navbar";
 
export const metadata = {
  title: `Demon's Password Manager`,
  description: '...',
}

export default function Home() {

  return (<>
  <Navbar/>
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Cardsloader/>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Password Manager</h1>
        
      </div>

      {/* Forms side-by-side */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <section className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add your Card</h2>
          <Addcard />
        </section>

        <section className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add your Password</h2>
          <Addpassword />
        </section>
      </div>

      {/* Saved data side-by-side */}
      <div className="flex flex-col md:flex-row gap-8">
        <section className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Cards</h2>
          <CardsList />
        </section>

        <section className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Passwords</h2>
          <PasswordsList />
        </section>
      </div>
    </main>
  </>
  );
}




