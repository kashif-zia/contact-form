'use client'
import global from './globals.css';
import React from 'react';
import { useState } from 'react';
export default function Home() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [first, setFirstName] = useState('')
  const [last, setLastName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => { 
    e.preventDefault()
    console.log('Sending')
  let data = {
      first,
      last,
      email,
      message,
      phone
    }
  fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('Response received')
      if (res.status === 200) {
        console.log('Response succeeded!')
        setSubmitted(true)
        setEmail('')
        setPhone('')
        setFirstName('')
        setLastName('')
        setMessage('')
      }
    })
  }
  return (
    <form className='container'>
      <h1>Get in touch</h1>
      <div className='email block'>
        <label htmlFor='frm-email'>Email</label>
        <input id='frm-email' type='email' onChange={(e)=>{setEmail(e.target.value)}} name='email' autoComplete='email' required />
      </div>
      <div className='block phone'>
        <label htmlFor='frm-phone'>Phone</label>
        <input id='frm-phone' type='text' onChange={(e)=>{setPhone(e.target.value)}} name='phone' autoComplete='tel' required />
      </div>
      <div className='name block'>
        <div>
          <label htmlFor='frm-first'>First Name</label>
          <input id='frm-first' type='text' onChange={(e)=>{setFirstName(e.target.value)}} name='first' autoComplete='given-name' required />
        </div>
        <div>
          <label htmlFor='frm-last'>Last Name</label>
          <input id='frm-last' type='text' onChange={(e)=>{setLastName(e.target.value)}} name='last' autoComplete='family-name' required />
        </div>
      </div>
      <div className='message block'>
        <label htmlFor='frm-message'>Message</label>
        <textarea id='frm-message' rows='6' onChange={(e)=>{setMessage(e.target.value)}} name='message'></textarea>
      </div>
      <div className='button block'>
        <button type='submit' onClick={(e)=>{handleSubmit(e)}}>Submit</button>
      </div>
    </form>
  );
}
