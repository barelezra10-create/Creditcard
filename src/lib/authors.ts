export const AUTHORS = {
  "bar-elezra": {
    name: "Bar Elezra",
    role: "Editor in Chief",
    bio: "Founder of The Credit Card Pick. Small business owner and credit cards user since 2012.",
    photo: "/images/authors/bar-elezra.jpg",
  },
  "editorial-team": {
    name: "Editorial Team",
    role: "The Credit Card Pick",
    bio: "Independent editorial team focused on credit card analysis.",
    photo: "/images/authors/editorial-team.jpg",
  },
} as const;

export type AuthorSlug = keyof typeof AUTHORS;
