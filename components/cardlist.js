"use client"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { subtraction } from "@/app/redux/cards/cardsslice";
import { useSelector } from "react-redux";
import { deletecard } from "@/app/actions/actions/clerkaction";

export default function CardsList() {
    const cards = useSelector((state) => state.cards.value);
    const dispatch = useDispatch();
    
  if (cards.length === 0)
    return <p className="text-gray-500 dark:text-gray-400">No cards added yet.</p>;

  return (
    <ul className="mt-6 space-y-4">
      {cards && cards.map(({ cardId, cardNumber, cvv, expiryDate }) => (
        <li
          key={cardId}
          className="p-4 relative border border-gray-200 dark:border-gray-700 rounded shadow-sm bg-gray-50 dark:bg-gray-800"
        >
          <p className="font-mono tracking-widest text-lg mb-1">{cardNumber}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{cvv}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Expiry: {expiryDate}</p>
          <div onClick={()=>{
            dispatch(subtraction(cardId));
            deletecard(cardId)}} className="delete hover:bg-red-600 transition-all duration-200 cursor-pointer absolute top-1/2 -translate-y-[48%] right-5 p-2 bg-black w-fit rounded-xl">
            <img className="invert" src="svgs/delete.svg" alt="Delete" />
          </div>
        </li>
      ))}
    </ul>
  );
}