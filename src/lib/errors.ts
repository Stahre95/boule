// Gör Supabases engelska felmeddelanden begripliga på svenska
export function translateError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Fel e-post eller lösenord.";
  if (m.includes("email not confirmed")) return "Bekräfta din e-post först. Kolla inkorgen.";
  if (m.includes("rate limit")) return "För många försök. Vänta en stund och försök igen.";
  if (m.includes("password should be at least")) return "Lösenordet måste vara minst 6 tecken.";
  if (m.includes("different from the old password")) return "Välj ett annat lösenord än det gamla.";
  if (m.includes("session missing")) return "Länken har gått ut. Begär en ny återställningslänk.";
  return "Något gick fel. Försök igen.";
}