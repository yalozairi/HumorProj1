import { createClient } from "@supabase/supabase-js";

export default async function Countries() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: university_majors } = await supabase.from("university_majors").select();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        University Majors
      </h1>
      {university_majors && university_majors.length > 0 ? (
        <ul className="py-8">
          {university_majors.map((major) => (
            <li key={major.id} className="text-white text-2xl">
              {major.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white text-2xl">No university majors found.</p>
      )}
    </main>
  );
}
