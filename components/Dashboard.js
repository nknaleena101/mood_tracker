'use client'
import { Fugaz_One } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar';
// import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const Fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ['400']
});

export default function Dashboard() {
  const { currentUser, userDataObj } = useAuth()
  
  function countValues(){

  }

  function handleSetMood(mood){
    // update the current state
    // update the globle state
    // update firebase
  }
  
  const statuses = {
    num_days: 14,
    time_remaining: '13:14:26',
    date: (new Date()).toDateString()
  }

  const moods = {
    '&*@#$': '😭',
    'Sad': '😢',
    'Existing': '😶',
    'Good': '😊',
    'Exited': '😍',
  }

  useEffect(() => {
    if (!currentUser || !userDataObj){
      return
    }
    stringifyResumeDataCache(userDataObj)
  }, [currentUser, userDataObj])
  
  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4'>
        {Object.keys(statuses).map((status, statusIndex) =>{
            return(
              <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
                
                <p className='font-medium uppercase text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
                <p className={'text-base sm:text-lg truncate ' + Fugaz.className}>{statuses[status]}</p>

              </div>
            )
          })}
      </div>
          <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center '+ Fugaz.className}>
            How do you <span className='textGradient'>feel</span> today?
          </h4>

          <div className='flex items-stretch flex-wrap gap-4'>
            {Object.keys(moods).map((mood, moodIndex) =>{
              return(
                <button className={'p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col gap-4 flex-1'} key={moodIndex}> 
                  <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
                  <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + Fugaz.className}>{mood}</p>
                </button>
              )
            })}
          </div>
          <Calendar data={data} handleSetMood={handleSetMood} />
    </div>
  )
}
