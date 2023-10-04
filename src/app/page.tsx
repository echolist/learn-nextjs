import prisma from '@/db'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const list_message = await prisma.comments.findMany();

  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl'>List of Message</h1>
        <Link className='border
        border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-800 focus-within:bg-slate-800 outline-none' href="/new">New Message</Link>
      </header>
      <ul className='pl-4'>
        {list_message.map(msg => (
          <li key={msg.id}>{msg.subject}</li>
        ))}
      </ul>
    </>
  )
}
