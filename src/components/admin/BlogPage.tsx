
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featuredImage: string;
  content: string;
}

export default function BlogPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Technology");
  const [featuredImage, setFeaturedImage] = useState("");
  const [content, setContent] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Generate URL slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    setSlug(generatedSlug);
  }, [title]);

  // Initialize Quill Editor
  useEffect(() => {
    let isMounted = true;

    const initializeEditor = async () => {
      if (!editorRef.current || quillRef.current) return;

      const Quill = (await import("quill")).default;

      if (!isMounted || !editorRef.current) return;

      const quill = new Quill(editorRef.current, {
        theme: "snow",

        placeholder: "Start writing your blog article here...",

        modules: {
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
        },

        formats: [
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
        ],
      });

      quillRef.current = quill;

      quill.on("text-change", () => {
        setContent(
          quill.getText().trim() ? quill.root.innerHTML : ""
        );
      });

      if (isMounted) {
        setIsEditorReady(true);
      }
    };

    initializeEditor();

    return () => {
      isMounted = false;

      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  // Reset form
  const handleReset = useCallback(() => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setCategory("Technology");
    setFeaturedImage("");
    setContent("");

    if (quillRef.current) {
      quillRef.current.setText("");
    }
  }, []);

  // Prepare blog data
  const getBlogData = (): BlogFormData | null => {
    if (!title.trim()) {
      alert("Please enter a blog title.");
      return null;
    }

    if (!content.trim()) {
      alert("Please write some blog content.");
      return null;
    }

    return {
      title,
      slug,
      excerpt,
      category,
      featuredImage,
      content,
    };
  };

  // Save as draft
  const handleSaveDraft = () => {
    const blogData = getBlogData();

    if (!blogData) return;

    console.log("Blog Draft:", {
      ...blogData,
      status: "draft",
    });

    alert("Draft data is ready. Connect your API to save it permanently.");
  };

  // Publish blog
  const handlePublish = () => {
    const blogData = getBlogData();

    if (!blogData) return;

    console.log("Published Blog:", {
      ...blogData,
      status: "published",
    });

    alert("Blog data is ready. Connect your API to publish it.");
  };

  return (
    <main className="min-h-screen w-full bg-[#f4f4f4] p-5 md:p-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-800">Blog Management</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-[#1e293b]">
              Blog Management
            </h1>

            <p className="mt-2 text-sm text-gray-600 md:text-base">
              Create, manage and publish your blog articles.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Clear Form
          </button>
        </div>

        {/* Main Editor Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-5 md:px-7">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Create New Article
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add your article details and write your content.
              </p>
            </div>

            <span className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
              Rich Text Editor
            </span>
          </div>

          {/* Form Content */}
          <div className="space-y-6 p-5 md:p-7">

            {/* Title */}
            <div>
              <label
                htmlFor="blog-title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Blog Title <span className="text-red-500">*</span>
              </label>

              <input
                id="blog-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-700 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="blog-slug"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                URL Slug
              </label>

              <div className="flex overflow-hidden rounded-lg border border-gray-300 bg-gray-50">
                <span className="flex items-center border-r border-gray-300 px-3 text-xs text-gray-500 md:text-sm">
                  /blog/
                </span>

                <input
                  id="blog-slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="your-blog-url"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-gray-600 outline-none"
                />
              </div>
            </div>

            {/* Category and Featured Image */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label
                  htmlFor="blog-category"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Category
                </label>

                <select
                  id="blog-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-700"
                >
                  <option value="Technology">Technology</option>
                  <option value="Development">Development</option>
                  <option value="Programming">Programming</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="featured-image"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Featured Image URL
                </label>

                <input
                  id="featured-image"
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-700"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="blog-excerpt"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Short Description
              </label>

              <textarea
                id="blog-excerpt"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a short description for your blog..."
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-700 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* Quill Editor */}
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Article Content <span className="text-red-500">*</span>
                  </label>

                  <p className="mt-1 text-xs text-gray-500">
                    Format your article using the rich text toolbar.
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {isEditorReady ? "Editor Ready" : "Loading Editor..."}
                </span>
              </div>

              <div className="blog-quill-wrapper">
                <div ref={editorRef} />
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse items-stretch justify-between gap-4 border-t border-gray-200 bg-gray-50 px-5 py-5 sm:flex-row sm:items-center md:px-7">

            <p className="text-xs text-gray-500">
              Required fields are marked with *
            </p>

            <div className="flex flex-wrap items-center gap-3">

              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:flex-none"
              >
                Save Draft
              </button>

              <button
                type="button"
                onClick={handlePublish}
                className="flex-1 rounded-lg bg-[#262626] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black sm:flex-none"
              >
                Publish Article
              </button>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
