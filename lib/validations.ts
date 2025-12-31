import { z } from "zod"

export const quoteInputSchema = z.object({
  websitePages: z.number().int().min(0).max(1000),
  webAppPages: z.number().int().min(0).max(1000),
  ecommercePages: z.number().int().min(0).max(1000),
  mobileScreens: z.number().int().min(0).max(1000),
  desktopFunctions: z.number().int().min(0).max(1000),
})

export const quoteSubmissionSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  notes: z.string().max(1000).optional(),
  honeypot: z.string().max(0).optional(), // spam protection
  websitePages: z.number().int().min(0),
  webAppPages: z.number().int().min(0),
  ecommercePages: z.number().int().min(0),
  mobileScreens: z.number().int().min(0),
  desktopFunctions: z.number().int().min(0),
  landingPages: z.number().int().min(0).default(0),
  wordpressTemplates: z.number().int().min(0).default(0),
  logoDesigns: z.number().int().min(0).default(0),
  brandingDesigns: z.number().int().min(0).default(0),
  backendHosting: z.boolean().default(false),
  webHosting5GB: z.boolean().default(false),
  webHosting10GB: z.boolean().default(false),
  cloudHosting20GB: z.boolean().default(false),
  paymentGateway: z.boolean().default(false),
  mailServer: z.boolean().default(false),
  reservedQuoteId: z.string().nullable().optional(),
})

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  country: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  honeypot: z.string().max(0).optional(),
})
