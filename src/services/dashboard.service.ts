export async function getDashboardData() {
  const res = await fetch("/api/dashboard", { cache: "no-store" });
  const json = await res.json();
  return json.data;
}