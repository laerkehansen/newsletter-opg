import { getSubsById, patchSub, deleteSub } from "@/app/lib/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function SingleView({ params }) {
  //Todo
  const { id } = await params;

  const subscriberArray = await getSubsById(id);

  const subscriber = subscriberArray[0]; //her vælger jeg det første element i mit array

  console.log("id", id);
  console.log("subscriber", subscriberArray);

  //her opdaterer jeg min data
  async function updateData(FormData) {
    "use server";
    console.log();
    const patchData = {
      navn: FormData.get("navn"),
      email: FormData.get("email"),
    };
    console.log(FormData);
    await patchSub(id, patchData);
    revalidatePath("/apitest");
    redirect("/apitest");
  }

  //her sletter jeg min subscription
  async function deletedata() {
    "use server";
    await deleteSub(id);
    revalidatePath("/apitest");
    redirect("/apitest");
  }

  return (
    <section className="grid justify-center items-center w-svw h-svh">
      <form
        action={updateData}
        className="bg-white w-72 rounded-lg p-3 grid gap-2 h-fit"
      >
        <legend>
          <h1 className="text-black text-2xl"></h1>
        </legend>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black">
            Name
          </label>
          <input
            type="text"
            defaultValue={subscriber.navn}
            id="navn"
            name="navn"
            className="bg-gray-100 text-black"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-black">
            Email
          </label>
          <input
            type="text"
            defaultValue={subscriber.email}
            id="email"
            name="email"
            className="bg-gray-100 text-black"
          />
        </div>
        <div className="flex justify-around">
          <button
            formAction={deletedata}
            className="bg-red-500 rounded-xl p-2 w-fit"
          >
            Delete
          </button>
          <button className="bg-blue-500 rounded-xl p-2">Save changes</button>
        </div>
      </form>
    </section>
  );
}

export default SingleView;
