"use server";
import { clerkClient } from "@clerk/nextjs/server";
import ncrypt from "ncrypt-js";
import { currentUser } from "@clerk/nextjs/server";
let edkeyobject = new ncrypt("asus-laptop-is-awesome");

export async function addcardserver(
  cardId,
  cardNumber,
  cvv,
  expiryDate,
  userId
) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (!user) console.error("User not found with ID:", userId);
  else {
    let cards = user.privateMetadata?.cards || [];

    cards.push({
      cardId: edkeyobject.encrypt(cardId),
      cardNumber: edkeyobject.encrypt(cardNumber),
      cvv: edkeyobject.encrypt(cvv),
      expiryDate: edkeyobject.encrypt(expiryDate),
    });

    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        cards: cards,
      },
    });
    console.log("User's private metadata:", user.privateMetadata);
  }
}

export async function getcards() {
  const client = await clerkClient();
  const sameuser = await currentUser();
  const user = await client.users.getUser(sameuser.id);
  let cards = user.privateMetadata?.cards || [];
  let decryptedcards = []
  if(cards.length>0){
    
  decryptedcards = cards.map((card) => ({
    cardId: edkeyobject.decrypt(card.cardId),
    cardNumber: edkeyobject.decrypt(card.cardNumber),
    cvv: edkeyobject.decrypt(card.cvv),
    expiryDate: edkeyobject.decrypt(card.expiryDate),
  }));
}
  return decryptedcards;
}

export async function deletecard(cardId) {
  const client = await clerkClient();
  const user = await currentUser();
  const userData = await client.users.getUser(user.id);
  if (!userData) {
    console.error("User not found with ID:", user.id);
    return;
  }
  let oldcards = await getcards();

  await client.users.updateUserMetadata(user.id, {
    privateMetadata: {
      cards: oldcards.filter((card) => card.cardId !== cardId).map((card)=>{
        return {
          cardId: edkeyobject.encrypt(card.cardId),
          cardNumber: edkeyobject.encrypt(card.cardNumber),
          cvv: edkeyobject.encrypt(card.cvv),
          expiryDate: edkeyobject.encrypt(card.expiryDate),
        }
      }),
    },
  });
}

export async function addpasswordserver(
  passwordId,
  websiteURL,
  username,
  password,
  userId
) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (!user) console.error("User not found with ID:", userId);
  else {
    let passwords = user.privateMetadata?.passwords || [];
    passwords.push({
      passwordId: edkeyobject.encrypt(passwordId),
      websiteURL: edkeyobject.encrypt(websiteURL),
      username: edkeyobject.encrypt(username),
      password: edkeyobject.encrypt(password),
    });

    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        passwords: passwords,
      },
    });
    console.log("User's private metadata:", user.privateMetadata);
  }
}

export async function getpasswords() {
  const client = await clerkClient();
  const sameuser = await currentUser();
  const user = await client.users.getUser(sameuser.id);
  let passwords = user.privateMetadata?.passwords || [];
  console.log(passwords);
  let decryptedpasswords = [];
  if (passwords.length > 0) {
    decryptedpasswords = passwords.map((password) => ({
      passwordId: edkeyobject.decrypt(password.passwordId),
      websiteURL: edkeyobject.decrypt(password.websiteURL),
      username: edkeyobject.decrypt(password.username),
      password: edkeyobject.decrypt(password.password),
    }));
  }
  return decryptedpasswords;
}

export async function deletepassword(passwordId) {
  const client = await clerkClient();
  const user = await currentUser();
  const userData = await client.users.getUser(user.id);
  if (!userData) {
    console.error("User not found with ID:", user.id);
    return;
  }
  let oldpasswords = await getpasswords();

  await client.users.updateUserMetadata(user.id, {
    privateMetadata: {
      passwords: oldpasswords.filter(
        (password) => password.passwordId !== passwordId
      ).map((password)=>{
        return {
          passwordId: edkeyobject.encrypt(password.passwordId),
          websiteURL: edkeyobject.encrypt(password.websiteURL),
          username: edkeyobject.encrypt(password.username),
          password: edkeyobject.encrypt(password.password),
        }
      }),
    },
  });
}
