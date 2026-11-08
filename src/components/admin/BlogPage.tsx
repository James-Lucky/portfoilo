"use client";

import { useCallback, useEffect, useRef, useState, ChangeEvent } from "react";
import type QuillType from "quill";
import "quill/dist/quill.snow.css";
import {
  IBlogFormData,
  IBlogItem,
  TBlogCategory,
  TBlogFilter,
  TBlogStatus,
} from "@/types/PagesTypes";

const CATEGORIES: TBlogCategory[] = [
  "Technology",
  "Development",
  "Programming",
  "AI & ML",
  "Design",
  "Business",
  "Other",
];

const INITIAL_FORM_STATE: IBlogFormData = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Technology",
  featuredImage: "",
  content: "",
};

const INITIAL_BLOGS: IBlogItem[] = [
  {
    id: "blog-1",
    title: "Next.js App Router Best Practices for Production",
    slug: "nextjs-app-router-best-practices-for-production",
    excerpt:
      "Learn how to structure layouts, server actions, and caching strategies in modern Next.js applications.",
    category: "Development",
    featuredImage: "",
    content: "<p>Full guide on Next.js App Router architecture...</p>",
    status: "published",
    updatedAt: "08 Nov 2026",
  },
  {
    id: "blog-2",
    title: "Integrating AI Agents in SaaS Dashboards",
    slug: "integrating-ai-agents-in-saas-dashboards",
    excerpt:
      "Practical patterns for building clean, responsive AI workflows inside admin panels.",
    category: "AI & ML",
    featuredImage: "",
    content: "<p>Draft notes on LLM streaming and tool calls...</p>",
    status: "draft",
    updatedAt: "07 Nov 2026",
  },
];

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "indent",
  "align",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
];

const generateSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function BlogPage() {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<QuillType | null>(null);

  const [formData, setFormData] = useState<IBlogFormData>(INITIAL_FORM_STATE);
  const [blogs, setBlogs] = useState<IBlogItem[]>(INITIAL_BLOGS);
  const [activeFilter, setActiveFilter] = useState<TBlogFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Initialize Quill
  useEffect(() => {
    let isMounted = true;
    const container = editorContainerRef.current;

    const initQuill = async () => {
      if (!container || quillInstanceRef.current) return;

      const Quill = (await import("quill")).default;
      if (!isMounted) return;

      container.innerHTML = "";
      const editorElement = document.createElement("div");
      container.appendChild(editorElement);

      const quill = new Quill(editorElement, {
        theme: "snow",
        placeholder: "Start writing your blog article here...",
        modules: QUILL_MODULES,
        formats: QUILL_FORMATS,
      });

      quill.on("text-change", () => {
        const plainText = quill.getText().trim();
        const htmlContent = plainText ? quill.root.innerHTML : "";
        setFormData((prev) => ({ ...prev, content: htmlContent }));
      });

      quillInstanceRef.current = quill;
      setIsEditorReady(true);
    };

    initQuill();

    return () => {
      isMounted = false;
      quillInstanceRef.current = null;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: isSlugManuallyEdited ? prev.slug : generateSlug(newTitle),
    }));
  };

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setIsSlugManuallyEdited(rawValue.trim().length > 0);
    setFormData((prev) => ({
      ...prev,
      slug: generateSlug(rawValue),
    }));
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setEditingId(null);
    setIsSlugManuallyEdited(false);
    if (quillInstanceRef.current) {
      quillInstanceRef.current.setText("");
    }
  }, []);

  const handleSubmit = (status: TBlogStatus) => {
    if (!formData.title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    if (!formData.content.trim()) {
      alert("Please write some blog content.");
      return;
    }

    const formattedDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const finalSlug = formData.slug || generateSlug(formData.title);

    if (editingId) {
      setBlogs((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...formData,
                slug: finalSlug,
                status,
                updatedAt: formattedDate,
              }
            : item
        )
      );
    } else {
      const newBlog: IBlogItem = {
        id: `blog-${Date.now()}`,
        ...formData,
        slug: finalSlug,
        status,
        updatedAt: formattedDate,
      };
      setBlogs((prev) => [newBlog, ...prev]);
    }

    handleReset();
  };

  const handleEditBlog = (blog: IBlogItem) => {
    setEditingId(blog.id);
    setIsSlugManuallyEdited(true);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      category: blog.category,
      featuredImage: blog.featuredImage,
      content: blog.content,
    });

    if (quillInstanceRef.current) {
      quillInstanceRef.current.root.innerHTML = blog.content;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleStatus = (id: string) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              status: blog.status === "published" ? "draft" : "published",
            }
          : blog
      )
    );
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    if (editingId === id) {
      handleReset();
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    activeFilter === "all" ? true : blog.status === activeFilter
  );

  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;

  return (
    <main className="min-h-screen w-full bg-[#f4f4f4] px-4 py-6 sm:px-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#1e293b] sm:text-3xl">
              Blog Management
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Create, manage and publish your blog articles.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="self-start rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:self-auto"
          >
            {editingId ? "Cancel Edit" : "Clear Form"}
          </button>
        </div>

        {/* Main Editor Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-6 md:px-7">
            <div>
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                {editingId ? "Edit Article" : "Create New Article"}
              </h2>
              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                Add your article details and write your content.
              </p>
            </div>

            <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              {editingId ? "Editing Mode" : "Rich Text Editor"}
            </span>
          </div>

          {/* Form Content */}
          <div className="space-y-5 p-4 sm:p-6 md:space-y-6 md:p-7">
            {/* Title */}
            <div>
              <label
                htmlFor="blog-title"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                id="blog-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter your blog title..."
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-700 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="blog-slug"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                URL Slug
              </label>
              <div className="flex overflow-hidden rounded-lg border border-gray-300 bg-gray-50 focus-within:border-gray-700 focus-within:ring-2 focus-within:ring-gray-100">
                <span className="flex select-none items-center border-r border-gray-300 bg-gray-100 px-3 text-xs text-gray-500 sm:text-sm">
                  /blog/
                </span>
                <input
                  id="blog-slug"
                  name="slug"
                  type="text"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  placeholder="your-blog-url"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-gray-700 outline-none"
                />
              </div>
            </div>

            {/* Category & Featured Image */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="blog-category"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  Category
                </label>
                <select
                  id="blog-category"
                  name="category"
                  value={formData.category}
                  onChange={handleFieldChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-700"
                >
                  {CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="featured-image"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  Featured Image URL
                </label>
                <input
                  id="featured-image"
                  name="featuredImage"
                  type="url"
                  value={formData.featuredImage}
                  onChange={handleFieldChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-700"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="blog-excerpt"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Short Description
              </label>
              <textarea
                id="blog-excerpt"
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleFieldChange}
                placeholder="Write a short description for your blog..."
                className="w-full resize-y rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-700 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Quill Editor */}
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Article Content <span className="text-red-500">*</span>
                  </label>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Format your article using the rich text toolbar.
                  </p>
                </div>

                <span className="text-xs font-medium text-gray-400">
                  {isEditorReady ? "Editor Ready" : "Loading Editor..."}
                </span>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-300 [&_.ql-container]:min-h-[260px] [&_.ql-container]:border-0 [&_.ql-container]:text-sm [&_.ql-editor]:min-h-[260px] [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.ql-toolbar]:bg-gray-50">
                <div ref={editorContainerRef} />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-gray-200 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:px-6 md:px-7">
            <p className="text-center text-xs text-gray-500 sm:text-left">
              Required fields are marked with{" "}
              <span className="text-red-500">*</span>
            </p>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => handleSubmit("draft")}
                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto"
              >
                {editingId ? "Update as Draft" : "Save Draft"}
              </button>

              <button
                type="button"
                onClick={() => handleSubmit("published")}
                className="w-full rounded-lg bg-[#262626] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black sm:w-auto"
              >
                {editingId ? "Update & Publish" : "Publish Article"}
              </button>
            </div>
          </div>
        </div>

        {/* Published & Draft Blogs Section */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Section Header & Filter Tabs */}
          <div className="flex flex-col justify-between gap-4 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:px-6 md:px-7">
            <div>
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                Your Articles
              </h2>
              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                Manage your published blogs and saved drafts.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  activeFilter === "all"
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All ({blogs.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("published")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  activeFilter === "published"
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Published ({publishedCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("draft")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  activeFilter === "draft"
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Drafts ({draftCount})
              </button>
            </div>
          </div>

          {/* Articles List */}
          {filteredBlogs.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-sm font-medium text-gray-700">
                No {activeFilter !== "all" ? activeFilter : ""} articles found.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Use the editor above to create and publish your first blog post.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredBlogs.map((blog) => {
                const isPublished = blog.status === "published";

                return (
                  <article
                    key={blog.id}
                    className="flex flex-col justify-between gap-4 p-4 transition hover:bg-gray-50/70 sm:p-6 md:flex-row md:items-center md:px-7"
                  >
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            isPublished
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                              : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isPublished ? "bg-emerald-600" : "bg-amber-500"
                            }`}
                          />
                          {isPublished ? "Published" : "Draft"}
                        </span>

                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                          {blog.category}
                        </span>

                        <span className="text-xs text-gray-400">
                          • Updated {blog.updatedAt}
                        </span>
                      </div>

                      <h3 className="truncate text-base font-semibold text-gray-900">
                        {blog.title}
                      </h3>

                      {blog.excerpt && (
                        <p className="line-clamp-2 text-xs text-gray-600 sm:text-sm">
                          {blog.excerpt}
                        </p>
                      )}

                      <p className="truncate text-xs text-gray-400">
                        /blog/{blog.slug}
                      </p>
                    </div>

                    {/* Item Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                      <button
                        type="button"
                        onClick={() => handleEditBlog(blog)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(blog.id)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        {isPublished ? "Move to Draft" : "Publish Now"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}