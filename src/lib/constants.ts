export const SITE_NAME = "Chidiac Optic";
export const SITE_DESCRIPTION =
  "Over 20 years of premium eyewear and professional optical services in Bickfaya, Lebanon. Expert eye care, 100% authentic designer brands, and professional lens fitting by Optometrist Francis Chidiac.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chidiacoptic.com";

export const BUSINESS = {
  name: "Chidiac Optic",
  owner: "Francis Chidiac",
  ownerTitle: "Optometrist",
  experience: "20+",
  tagline: "It's not the job you do, it's how you do the job..",
  description:
    "Professional Eye Test, Optical Eyeglasses | Prescription Lenses, 100% Authentic Sunglasses | Authorized Dealer",
  location: "Bickfaya, Main Road, Matn, Lebanon",
  phone: "+961 4 986 983",
  mobile: "+961 3 911 173",
  whatsapp: "+961-78-911-172",
  whatsappNumber: "96178911172",
  email: "info@chidiacoptic.com",
  workingHours: {
    weekdays: "Monday - Saturday: 9:00 AM - 7:00 PM",
    weekend: "Sunday: Closed",
  },
  social: {
    facebook: "https://www.facebook.com/ChidiacOptic",
    instagram: "https://www.instagram.com/chidiacoptic",
  },
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5!2d35.6467!3d33.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBickfaya%2C+Lebanon!5e0!3m2!1sen!2slb",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Women", href: "/shop?category=women" },
      { label: "Men", href: "/shop?category=men" },
      { label: "Kids", href: "/shop?category=kids" },
      { label: "Contact Lenses", href: "/shop?category=contact-lenses" },
      { label: "Sale", href: "/shop?sale=true" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
] as const;

export const BRANDS = [
  "Dolce & Gabbana",
  "Porsche Design",
  "Prada",
  "Versace",
  "Emporio Armani",
  "Guess",
  "Ray-Ban",
  "Oakley",
  "Silhouette",
  "Jaguar",
  "Paul & Joe",
  "Molsion",
  "Folie",
  "Furla",
  "Swarovski",
  "Miu Miu",
  "Ralph Lauren",
  "Just Cavalli",
  "Acuvue",
  "Bella",
  "Biofinity",
  "FreshLook",
] as const;

export const PRODUCTS_PER_PAGE = 12;

export const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Popularity", value: "popularity" },
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
] as const;
