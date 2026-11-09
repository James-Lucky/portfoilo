import { IWebsiteCMSData } from "@/types/PagesTypes";

export async function getWebsiteCMS(): Promise<IWebsiteCMSData | null> {
  const res = await fetch("/api/website", { cache: "no-store" });
  const json = await res.json();
  return json.data || null;
}

export async function updateWebsiteCMS(data: IWebsiteCMSData) {
  const res = await fetch("/api/website", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}