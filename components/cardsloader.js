"use client"

import {useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getcards ,getpasswords} from '@/app/actions/actions/clerkaction'
import { setcards } from '@/app/redux/cards/cardsslice'
import { setpasswords } from '@/app/redux/passwords/passwordslice'

const cardsloader = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      const fetchingcards = async () => {
        const cards = await getcards()
        const passwords = await getpasswords()
        dispatch(setpasswords(passwords))
        dispatch(setcards(cards))
      }
      fetchingcards()
    }, [])
    
  return null
}

export default cardsloader