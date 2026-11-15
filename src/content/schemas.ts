import { z } from 'zod';
export const schemas = {
  pages: {
    about: z.object({
      "milestones": z.array(z.object({
        "year": z.string(),
        "label": z.string(),
        "desc": z.string(),
        "id": z.string()
      }))
    }),
    home: z.object({
      "globalReach": z.object({
        "eyebrow": z.string(),
        "heading": z.string(),
        "body": z.string(),
        "regions": z.array(z.object({
          "id": z.string(),
          "flag": z.string(),
          "label": z.string(),
          "sub": z.string()
        }))
      })
    }),
    contact: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "heading": z.string(),
        "body": z.string()
      }),
      "sidebar": z.object({
        "eyebrow": z.string(),
        "heading": z.string(),
        "body": z.string(),
        "whoWeWorkWith": z.object({
          "heading": z.string(),
          "items": z.array(z.object({
            "id": z.string(),
            "text": z.string()
          }))
        })
      }),
      "success": z.object({
        "heading": z.string(),
        "body": z.string(),
        "resetLabel": z.string()
      })
    }),
    leadership: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "founder": z.object({
        "name": z.string(),
        "title": z.string(),
        "company": z.string(),
        "photo": z.string(),
        "photoAlt": z.string()
      }),
      "letter": z.object({
        "eyebrow": z.string(),
        "paragraphs": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        })),
        "signatureName": z.string(),
        "signatureTitle": z.string(),
        "signatureCompany": z.string()
      }),
      "cta": z.object({
        "headline": z.string(),
        "body": z.string(),
        "primaryLabel": z.string(),
        "primaryHref": z.string(),
        "secondaryLabel": z.string(),
        "secondaryHref": z.string()
      })
    }),
    farmer_partnership: z.object({
      "placeholder": z.object({
        "eyebrow": z.string(),
        "heading": z.string(),
        "body": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;