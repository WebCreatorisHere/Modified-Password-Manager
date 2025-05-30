"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removePassword } from "@/app/redux/passwords/passwordslice";
import { deletepassword } from "@/app/actions/actions/clerkaction";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function PasswordsList() {
  const dispatch = useDispatch();
  const passwords = useSelector((state) => state.passwords.value);

  const toggleVisibility = (e, id) => {
    let input = document.querySelector(`.input-${id}`);
    if (input.type == "password") {
      input.type = "text";
      e.target.innerText = "Hide";
    } else {
      input.type = "password";
      e.target.innerText = "Show";
    }
  };

  if (passwords.length === 0)
    return (
      <p className="text-gray-500 dark:text-gray-400">
        No passwords added yet.
      </p>
    );

  return (
    <ul className="mt-6 space-y-4">
      {passwords.map(({ passwordId, websiteURL, username, password }) => {
        return (
          <li
            key={passwordId}
            className="p-4 relative border border-gray-200 dark:border-gray-700 rounded shadow-sm bg-gray-50 dark:bg-gray-800 flex flex-col gap-1"
          >
            <div className="flex justify-between items-center">
              <a target="_blank" href={websiteURL} className="font-semibold">
                {websiteURL}
              </a>
              <button
                onClick={(e) => toggleVisibility(e, passwordId)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                type="button"
              >
                Show
              </button>
               <button onClick={async()=>{
                 dispatch(removePassword(passwordId))
                 deletepassword(passwordId)
                }} className="delete hover:bg-red-600 transition-all duration-200 cursor-pointer absolute top-1/2 -translate-y-[1%] right-3 p-2 bg-black w-fit rounded-xl">
                          <img className="invert" src="svgs/delete.svg" alt="Delete" />
              </button>

            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {username}
            </p>
            <input
              className={`focus:outline-none dark:bg-transparent cursor-default input-${passwordId}`}
              readOnly
              type="password"
              value={password}
            />
          </li>
        );
      })}
    </ul>
  );
}
