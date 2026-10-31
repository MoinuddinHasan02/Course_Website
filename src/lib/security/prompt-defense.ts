import { z } from 'zod';

/**
 * Prompt Injection & Adversarial Attack Defense Suite
 * Protects against prompt jailbreaks, system instruction overrides, delimiter injection,
 * and malicious payload abuse across all input channels.
 */

// Known adversarial patterns & delimiter sequences
const ADVERSARIAL_PROMPT_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+(instructions|prompts|rules)/i,
  /disregard\s+(all\s+)?(previous|prior)\s+(instructions|directives)/i,
  /you\s+are\s+now\s+(in\s+)?(developer|dan|god|jailbreak|unrestricted)\s+mode/i,
  /forget\s+(your\s+)?(instructions|guidelines|rules|constraints)/i,
  /reveal\s+(your\s+)?(system\s+prompt|developer\s+message|internal\s+instructions)/i,
  /<\/?(?:system|instruction|prompt|context|override)>/i,
  /<<\s*SYS\s*>>|<<\s*\/SYS\s*>>/i,
  /\[\s*INST\s*\]|\[\s*\/INST\s*\]/i,
  /<\|(?:im_start|im_end|system|user|assistant)\|>/i,
  /\[\s*SYSTEM\s*:\s*/i,
  /(\b(?:exec|eval|function)\s*\(|javascript\s*:|data\s*:\s*text\/html)/i,
];

/**
 * Sanitizes generic user input:
 * - Trips and removes adversarial prompt delimiters
 * - Strips dangerous HTML / script vectors
 * - Truncates excess character floods
 */
export function sanitizeInput(input: unknown, maxLength = 2000): string {
  if (typeof input !== 'string') return '';
  
  // Truncate length
  let sanitized = input.slice(0, maxLength);

  // Strip non-printable / control characters except standard newlines & tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Strip basic HTML/script tags
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '');

  return sanitized.trim();
}

/**
 * Checks whether an input contains known prompt injection or jailbreak indicators.
 */
export function checkPromptInjection(input: string): { isMalicious: boolean; reason?: string } {
  if (!input) return { isMalicious: false };

  for (const pattern of ADVERSARIAL_PROMPT_PATTERNS) {
    if (pattern.test(input)) {
      return {
        isMalicious: true,
        reason: 'Input contains prohibited override patterns or system-delimiter tokens.',
      };
    }
  }

  // Check for repeated token flood attack
  if (/(\b\w+\b)(?:\s+\1){15,}/i.test(input)) {
    return {
      isMalicious: true,
      reason: 'Excessive repetitive token repetition detected.',
    };
  }

  return { isMalicious: false };
}

/**
 * Strictly validated Zod schemas with prompt defense built-in.
 */

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .max(100, { message: 'Email must be under 100 characters' })
    .refine((val) => !checkPromptInjection(val).isMalicious, {
      message: 'Suspicious email format detected',
    }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(128, { message: 'Password exceeds maximum length' }),
});

export const StudentCreateSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid student email address' })
    .max(100)
    .refine((val) => !checkPromptInjection(val).isMalicious, {
      message: 'Suspicious characters in email',
    }),
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(80)
    .refine((val) => !checkPromptInjection(val).isMalicious, {
      message: 'Invalid characters in name',
    }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(128),
});

export const CourseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'Course title must be at least 3 characters' })
    .max(120)
    .refine((val) => !checkPromptInjection(val).isMalicious, {
      message: 'Suspicious pattern in course title',
    }),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens' })
    .max(80),
  description: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .refine((val) => !val || !checkPromptInjection(val).isMalicious, {
      message: 'Invalid characters in course description',
    }),
  level: z.string().trim().max(50).default('All Levels'),
  duration: z.string().trim().max(50).optional(),
});

export const VideoSchema = z.object({
  courseId: z.string().min(1, { message: 'Course is required' }),
  title: z
    .string()
    .trim()
    .min(3, { message: 'Video title must be at least 3 characters' })
    .max(150)
    .refine((val) => !checkPromptInjection(val).isMalicious, {
      message: 'Invalid characters in video title',
    }),
  description: z.string().trim().max(1000).optional(),
  videoUrl: z
    .string()
    .trim()
    .min(5, { message: 'Valid video URL or embed link required' })
    .max(500)
    .refine(
      (url) =>
        url.startsWith('https://') ||
        url.startsWith('http://') ||
        url.startsWith('/') ||
        url.includes('youtube.com') ||
        url.includes('youtu.be') ||
        url.includes('vimeo.com') ||
        url.includes('drive.google.com'),
      { message: 'Video URL must be a valid secure URL (YouTube, Vimeo, Google Drive, or HTTPS direct stream)' }
    ),
  duration: z.string().trim().max(30).optional(),
  order: z.number().int().min(0).default(0),
  isFreePreview: z.boolean().default(false),
});
