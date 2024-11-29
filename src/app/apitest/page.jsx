import { getSubs } from "@/app/lib/supabase";
import Newsletter from "@/app/components/newsletter";
import Link from "next/link";

export default async function Home() {
  const subscribers = await getSubs();
  return (
    <>
      <Newsletter></Newsletter>
      <ul className="flex flex-wrap gap-3 max-w-sm">
        {subscribers.map((sub) => (
          <li key={sub.id} className="min-w-24 m">
            <Link href={`./apitest/update/${sub.id}`}>
              <div className="bg-white p-2 rounded text-black">
                <p className="font-semibold">{sub.navn}</p>
                <p className="text-gray-600">{sub.email}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
