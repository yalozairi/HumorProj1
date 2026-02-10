import { getSupabase } from "@/lib/supabase";

export default async function CountriesPage() {
  const supabase = getSupabase();
  const { data: countries } = await supabase.from("countries").select();

  return (
    <ul>
      {countries?.map((country) => (
        <li key={country.id}>{country.name}</li>
      ))}
    </ul>
  );
}
