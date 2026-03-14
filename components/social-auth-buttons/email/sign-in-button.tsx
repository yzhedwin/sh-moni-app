import { supabase } from "@/lib/supabase";

export async function signUpNewUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000", //change to prod url
    },
  });
  if (error != null) {
    throw new Error(error.message);
  }
  return data;
}
export async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error != null) {
    throw new Error(error.message);
  }

  return data;
}
