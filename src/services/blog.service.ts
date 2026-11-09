import { IBlogFormData, IBlogItem, TBlogFilter } from "@/types/PagesTypes";

export async function getBlogs(status: TBlogFilter = "all"): Promise<IBlogItem[]> {
  const res = await fetch(`/api/blogs?status=${status}`, { cache: "no-store" });
  const json = await res.json();
  return json.data || [];
}

export async function createBlog(data: IBlogFormData & { status: string }) {
  const res = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBlog(id: string, data: Partial<IBlogFormData & { status: string }>) {
  const res = await fetch(`/api/blogs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBlog(id: string) {
  const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
  return res.json();
}