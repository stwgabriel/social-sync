// Translations queries
export const getTranslationsQuery = `
  *[_type == "translations" && language == $language][0] {
    navigation,
    hero,
    services,
    projects,
    testimonials,
    contact,
    footer
  }
`

// Services queries
export const getAllServicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    features,
    image {
      asset->
    }
  }
`

// Projects queries
export const getAllProjectsQuery = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    category->{
      _id,
      name,
      slug
    },
    description,
    mainImage {
      asset->
    },
    gallery[]{
      asset->
    },
    client,
    date,
    tags,
    content
  }
`

export const getProjectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category->{
      _id,
      name,
      slug
    },
    description,
    mainImage {
      asset->
    },
    gallery[]{
      asset->
    },
    client,
    date,
    tags,
    content,
    results,
    testimonial
  }
`

export const getProjectCategoriesQuery = `
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    slug
  }
`

// Testimonials query
export const getTestimonialsQuery = `
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    position,
    company,
    content,
    avatar {
      asset->
    }
  }
`

// Homepage content query
export const getHomePageContentQuery = `
  *[_type == "homepage"][0] {
    hero {
      title,
      subtitle,
      image {
        asset->
      }
    },
    featuredServices[]->{
      _id,
      title,
      slug,
      description,
      icon
    },
    featuredProjects[]->{
      _id,
      title,
      slug,
      category->{name},
      description,
      mainImage {
        asset->
      }
    },
    featuredTestimonials[]->{
      _id,
      name,
      position,
      company,
      content,
      avatar {
        asset->
      }
    }
  }
`

