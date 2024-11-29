import { postSubs, patchSub } from "@/app/lib/supabase";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function Newsletter() {
  console.log(subscribers);
  async function send(FormData) {
    "use server";
    const data = {
      navn: FormData.get("navn"),
      email: FormData.get("email"),
    };

    console.log(data);
    await postSubs(data);

    //det her er hvor min route er, altså i dette tilfælde apitest
    revalidatePath("/");
  }
  return (
    <form action={send} className="bg-white w-fit rounded-lg p-3 grid gap-2">
      <legend>
        <h1 className="text-black text-2xl">Newsletter</h1>
      </legend>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-black">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="navn"
          className="bg-gray-100 text-gray-700"
          required={true}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-black">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          required={true}
          className="bg-gray-100 text-gray-700"
        />
      </div>
      <button className="bg-blue-500 rounded-xl p-3">Subscribe</button>
    </form>
  );
}

export default Newsletter;
