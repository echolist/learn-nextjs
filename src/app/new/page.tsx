import prisma from "@/db";
import { comments_status } from "@prisma/client";
import Link from "next/link";
import React from "react";

export const Page = () => {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1>Send your message here</h1>
      </header>
      <form
        action={createGuestBook}
        method="POST"
        className="flex gap-2 flex-col"
      >
        <input
          type="email"
          className="border 
          border-slate-100 
          bg-transparent 
          rounded
          px-1 py-2 pl-1 "
          name="email"
          required="true"
          placeholder="Email"
        />
        <input
          type="text"
          className="border 
          border-slate-100 
          bg-transparent 
          rounded
          px-1 py-2 pl-1 "
          name="first_name"
          placeholder="First Name"
        />
        <input
          type="text"
          className="border 
          border-slate-100 
          bg-transparent 
          rounded
          px-1 py-2 pl-1 "
          name="last_name"
          placeholder="Last Name"
        />
        <input
          type="text"
          className="border 
          border-slate-100 
          bg-transparent 
          rounded
          px-1 py-2 pl-1 "
          name="subject"
          placeholder="Subject"
        />
        <textarea
          className="border 
            border-slate-100 
            bg-transparent 
            rounded
            px-1 py-2 pl-1 "
          name="message"
          placeholder="Message"
        ></textarea>

        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border
                    border-slate-300 
                    text-slate-300 
                    px-2 
                    py-1 
                    rounded 
                    hover:bg-slate-800 
                    focus-within:bg-slate-800 
                    outline-none"
          >
            Back
          </Link>
          <button
            type="submit"
            className="border
                    border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-800 focus-within:bg-slate-800 outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

async function createGuestBook(data: FormData) {
  "use server";
  const email = data.get("email")?.toString();
  const first_name = data.get("first_name")?.toString();
  const last_name = data.get("last_name")?.toString();
  const subject = data.get("subject")?.toString();
  const message = data.get("message")?.toString();
  const address = data.get("address")?.toString();
  const last_comment = new Date();
  let user_id: number = 0;
  //get user by email first
  const user = await prisma.users.findFirst({ where: { email: email } });
  if (user !== null) {
    user_id = user.user_id;
    await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        first_name: first_name,
        last_name: last_name,
        address: address,
        last_comment: last_comment,
      },
    });
  } else {
    const user = await prisma.users.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        address: address,
        email: email,
        last_comment: last_comment,
      },
    });
    user_id = user.user_id;
  }
  await prisma.comments.create({
    data: {
      subject: subject,
      status: comments_status.public,
      message: message,
      user_id: user_id,
    },
  });
}

export default Page;
