"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { fetchSanityData } from "@/lib/sanity"
import { getTranslationsQuery } from "@/lib/queries"

type Language = "pt" | "en"

type Translations = {
  navigation: {
    home: string
    services: string
    projects: string
    contact: string
  }
  hero: {
    title: string
    tagline: string
    cta: string
  }
  services: {
    title: string
    viewAll: string
    contactUs: string
    socialMedia: {
      title: string
      description: string
    }
    paidTraffic: {
      title: string
      description: string
    }
    webDevelopment: {
      title: string
      description: string
    }
    photography: {
      title: string
      description: string
    }
  }
  projects: {
    title: string
    subtitle: string
    viewAll: string
  }
  testimonials: {
    title: string
    subtitle: string
  }
  contact: {
    title: string
    subtitle: string
    form: {
      name: string
      email: string
      subject: string
      message: string
      send: string
      messageSent: string
      messageError: string
    }
  }
  footer: {
    tagline: string
    quickLinks: string
    allRightsReserved: string
    privacyPolicy: string
    termsOfService: string
  }
}

// Default translations as fallback
const defaultTranslations: Record<Language, Translations> = {
  pt: {
    navigation: {
      home: "Início",
      services: "Serviços",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      title: "Abrindo as portas da sua marca para o mundo",
      tagline:
        "Transformamos sua presença digital em resultados reais através de estratégias personalizadas e criativas.",
      cta: "Conheça nossos serviços",
    },
    services: {
      title: "Nossos Serviços",
      viewAll: "Ver todos os serviços",
      contactUs: "Entre em contato",
      socialMedia: {
        title: "Social Media",
        description: "Estratégias completas para suas redes sociais, desde planejamento até análise de resultados.",
      },
      paidTraffic: {
        title: "Tráfego Pago",
        description: "Campanhas de anúncios otimizadas para alcançar seu público-alvo e gerar resultados.",
      },
      webDevelopment: {
        title: "Desenvolvimento Web",
        description: "Criação de sites e aplicativos personalizados com foco em experiência do usuário.",
      },
      photography: {
        title: "Fotografia",
        description: "Produção visual profissional para valorizar sua marca e produtos.",
      },
    },
    projects: {
      title: "Projetos Realizados",
      subtitle: "Conheça alguns dos nossos trabalhos de sucesso",
      viewAll: "Ver todos os projetos",
    },
    testimonials: {
      title: "Depoimentos",
      subtitle: "O que nossos clientes dizem",
    },
    contact: {
      title: "Entre em Contato",
      subtitle: "Estamos prontos para transformar sua marca",
      form: {
        name: "Nome",
        email: "E-mail",
        subject: "Assunto",
        message: "Mensagem",
        send: "Enviar mensagem",
        messageSent: "Mensagem enviada com sucesso!",
        messageError: "Ocorreu um erro. Tente novamente.",
      },
    },
    footer: {
      tagline: "Abrindo as portas da sua marca para o mundo",
      quickLinks: "Links rápidos",
      allRightsReserved: "Todos os direitos reservados",
      privacyPolicy: "Política de Privacidade",
      termsOfService: "Termos de Uso",
    },
  },
  en: {
    navigation: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      title: "Opening your brand's doors to the world",
      tagline: "We transform your digital presence into real results through personalized and creative strategies.",
      cta: "Explore our services",
    },
    services: {
      title: "Our Services",
      viewAll: "View all services",
      contactUs: "Contact us",
      socialMedia: {
        title: "Social Media",
        description: "Complete strategies for your social networks, from planning to results analysis.",
      },
      paidTraffic: {
        title: "Paid Traffic",
        description: "Optimized ad campaigns to reach your target audience and generate results.",
      },
      webDevelopment: {
        title: "Web Development",
        description: "Creation of custom websites and applications with a focus on user experience.",
      },
      photography: {
        title: "Photography",
        description: "Professional visual production to enhance your brand and products.",
      },
    },
    projects: {
      title: "Completed Projects",
      subtitle: "Discover some of our successful work",
      viewAll: "View all projects",
    },
    testimonials: {
      title: "Testimonials",
      subtitle: "What our clients say",
    },
    contact: {
      title: "Contact Us",
      subtitle: "We're ready to transform your brand",
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        messageSent: "Message sent successfully!",
        messageError: "An error occurred. Please try again.",
      },
    },
    footer: {
      tagline: "Opening your brand's doors to the world",
      quickLinks: "Quick Links",
      allRightsReserved: "All rights reserved",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
    },
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Translations
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguage] = useState<Language>("pt")
  const [translations, setTranslations] = useState<Translations>(defaultTranslations.pt)
  const [isLoading, setIsLoading] = useState(true)

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Fetch translations from Sanity when language changes
  useEffect(() => {
    async function loadTranslations() {
      setIsLoading(true)
      try {
        const sanityTranslations = await fetchSanityData<Translations>(getTranslationsQuery, { language })

        if (sanityTranslations) {
          setTranslations(sanityTranslations)
        } else {
          // Fallback to default translations if Sanity data is not available
          setTranslations(defaultTranslations[language])
        }
      } catch (error) {
        console.error("Error loading translations:", error)
        setTranslations(defaultTranslations[language])
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()

    // Save language preference to localStorage
    localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  const value = {
    language,
    setLanguage,
    translations,
    isLoading,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

