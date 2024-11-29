import Link from "next/link";
import Newsletter from "@/app/components/newsletter";

import { getSubs } from "@/app/lib/supabase";

export default async function Home() {
  const subscribers = await getSubs();
  console.log(subscribers);

  return (
    <div className="grid justify-items-center items-center h-svh w-svw">
      <div>
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Newsletter
        </h1>
        <Newsletter />
      </div>
      <div className="bg-gray-800 self-start p-4 rounded">
        <ul className="flex flex-wrap gap-3 max-w-sm">
          {subscribers.map((sub) => (
            <li key={sub.id} className="min-w-24 m">
              <Link href={`./update/${sub.id}`}>
                <div className="bg-white p-2 rounded text-black">
                  <p className="font-semibold">{sub.navn}</p>
                  <p className="text-gray-600">{sub.email}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
