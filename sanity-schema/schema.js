// This file would be used in your Sanity Studio project
export default [
  // Document types
  {
    name: "translations",
    title: "Translations",
    type: "document",
    fields: [
      {
        name: "language",
        title: "Language",
        type: "string",
        options: {
          list: [
            { title: "Portuguese", value: "pt" },
            { title: "English", value: "en" },
          ],
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: "navigation",
        title: "Navigation",
        type: "object",
        fields: [
          { name: "home", title: "Home", type: "string" },
          { name: "services", title: "Services", type: "string" },
          { name: "projects", title: "Projects", type: "string" },
          { name: "contact", title: "Contact", type: "string" },
        ],
      },
      {
        name: "hero",
        title: "Hero Section",
        type: "object",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "tagline", title: "Tagline", type: "text" },
          { name: "cta", title: "CTA Button", type: "string" },
        ],
      },
      {
        name: "services",
        title: "Services Section",
        type: "object",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "viewAll", title: "View All Button", type: "string" },
          { name: "contactUs", title: "Contact Us Button", type: "string" },
          {
            name: "socialMedia",
            title: "Social Media",
            type: "object",
            fields: [
              { name: "title", title: "Title", type: "string" },
              { name: "description", title: "Description", type: "text" },
            ],
          },
          {
            name: "paidTraffic",
            title: "Paid Traffic",
            type: "object",
            fields: [
              { name: "title", title: "Title", type: "string" },
              { name: "description", title: "Description", type: "text" },
            ],
          },
          {
            name: "webDevelopment",
            title: "Web Development",
            type: "object",
            fields: [
              { name: "title", title: "Title", type: "string" },
              { name: "description", title: "Description", type: "text" },
            ],
          },
          {
            name: "photography",
            title: "Photography",
            type: "object",
            fields: [
              { name: "title", title: "Title", type: "string" },
              { name: "description", title: "Description", type: "text" },
            ],
          },
        ],
      },
      {
        name: "projects",
        title: "Projects Section",
        type: "object",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "subtitle", title: "Subtitle", type: "text" },
          { name: "viewAll", title: "View All Button", type: "string" },
        ],
      },
      {
        name: "testimonials",
        title: "Testimonials Section",
        type: "object",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "subtitle", title: "Subtitle", type: "text" },
        ],
      },
      {
        name: "contact",
        title: "Contact Section",
        type: "object",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "subtitle", title: "Subtitle", type: "text" },
          {
            name: "form",
            title: "Form Labels",
            type: "object",
            fields: [
              { name: "name", title: "Name Field", type: "string" },
              { name: "email", title: "Email Field", type: "string" },
              { name: "subject", title: "Subject Field", type: "string" },
              { name: "message", title: "Message Field", type: "string" },
              { name: "send", title: "Send Button", type: "string" },
              { name: "messageSent", title: "Success Message", type: "string" },
              { name: "messageError", title: "Error Message", type: "string" },
            ],
          },
        ],
      },
      {
        name: "footer",
        title: "Footer",
        type: "object",
        fields: [
          { name: "tagline", title: "Tagline", type: "string" },
          { name: "quickLinks", title: "Quick Links Title", type: "string" },
          { name: "allRightsReserved", title: "Copyright Text", type: "string" },
          { name: "privacyPolicy", title: "Privacy Policy", type: "string" },
          { name: "termsOfService", title: "Terms of Service", type: "string" },
        ],
      },
    ],
    preview: {
      select: {
        title: "language",
      },
      prepare({ title }) {
        return {
          title: `Translations (${title.toUpperCase()})`,
        }
      },
    },
  },
  {
    name: "service",
    title: "Services",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "icon",
        title: "Icon",
        type: "string",
        options: {
          list: [
            { title: "Share2", value: "share2" },
            { title: "LineChart", value: "lineChart" },
            { title: "Code", value: "code" },
            { title: "Camera", value: "camera" },
          ],
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: "features",
        title: "Features",
        type: "array",
        of: [{ type: "string" }],
        validation: (Rule) => Rule.required().min(1),
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "order",
        title: "Order",
        type: "number",
        validation: (Rule) => Rule.required(),
      },
    ],
    preview: {
      select: {
        title: "title",
        media: "image",
      },
    },
  },
  {
    name: "category",
    title: "Project Categories",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "name",
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: "order",
        title: "Order",
        type: "number",
        validation: (Rule) => Rule.required(),
      },
    ],
  },
  {
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: "category",
        title: "Category",
        type: "reference",
        to: [{ type: "category" }],
        validation: (Rule) => Rule.required(),
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "mainImage",
        title: "Main Image",
        type: "image",
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: "gallery",
        title: "Gallery",
        type: "array",
        of: [{ type: "image", options: { hotspot: true } }],
      },
      {
        name: "client",
        title: "Client",
        type: "string",
      },
      {
        name: "date",
        title: "Date",
        type: "date",
      },
      {
        name: "tags",
        title: "Tags",
        type: "array",
        of: [{ type: "string" }],
      },
      {
        name: "content",
        title: "Content",
        type: "array",
        of: [
          {
            type: "block",
          },
          {
            type: "image",
            options: { hotspot: true },
          },
        ],
      },
      {
        name: "results",
        title: "Results",
        type: "array",
        of: [
          {
            type: "block",
          },
        ],
      },
      {
        name: "testimonial",
        title: "Client Testimonial",
        type: "text",
      },
    ],
    preview: {
      select: {
        title: "title",
        media: "mainImage",
        category: "category.name",
      },
      prepare({ title, media, category }) {
        return {
          title,
          subtitle: category,
          media,
        }
      },
    },
  },
  {
    name: "testimonial",
    title: "Testimonials",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "position",
        title: "Position",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "company",
        title: "Company",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "content",
        title: "Content",
        type: "text",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "avatar",
        title: "Avatar",
        type: "image",
        options: {
          hotspot: true,
        },
      },
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "company",
        media: "avatar",
      },
    },
  },
  {
    name: "homepage",
    title: "Homepage",
    type: "document",
    fields: [
      {
        name: "hero",
        title: "Hero Section",
        type: "object",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "subtitle", title: "Subtitle", type: "text" },
          {
            name: "image",
            title: "Background Image",
            type: "image",
            options: { hotspot: true },
          },
        ],
      },
      {
        name: "featuredServices",
        title: "Featured Services",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "service" }],
          },
        ],
      },
      {
        name: "featuredProjects",
        title: "Featured Projects",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "project" }],
          },
        ],
      },
      {
        name: "featuredTestimonials",
        title: "Featured Testimonials",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "testimonial" }],
          },
        ],
      },
    ],
    preview: {
      prepare() {
        return {
          title: "Homepage Content",
        }
      },
    },
  },
  {
    name: "contactMessage",
    title: "Contact Messages",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        readOnly: true,
      },
      {
        name: "email",
        title: "Email",
        type: "string",
        readOnly: true,
      },
      {
        name: "subject",
        title: "Subject",
        type: "string",
        readOnly: true,
      },
      {
        name: "message",
        title: "Message",
        type: "text",
        readOnly: true,
      },
      {
        name: "receivedAt",
        title: "Received At",
        type: "datetime",
        readOnly: true,
      },
      {
        name: "status",
        title: "Status",
        type: "string",
        options: {
          list: [
            { title: "New", value: "new" },
            { title: "Read", value: "read" },
            { title: "Replied", value: "replied" },
            { title: "Archived", value: "archived" },
          ],
        },
      },
    ],
    preview: {
      select: {
        title: "subject",
        subtitle: "name",
        description: "receivedAt",
      },
      prepare({ title, subtitle, description }) {
        return {
          title,
          subtitle: `From: ${subtitle} - ${new Date(description).toLocaleDateString()}`,
        }
      },
    },
  },
]

