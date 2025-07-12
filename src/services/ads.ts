'use server';

/**
 * @fileOverview A simple ad service to serve brand images.
 * This file simulates a backend service that returns ad image URLs
 * based on a given hint. In a real application, this could be
 * a database call or a more complex ad-serving logic.
 */

// A simple in-memory "database" of ad placements.
// You can replace these placeholder URLs with your actual ad creatives.
const adCatalog: Record<string, string> = {
  'brand logo': 'https://placehold.co/200x200/353535/ffffff?text=Brand+A',
  'sports drink': 'https://placehold.co/200x200/E34444/ffffff?text=Drink+Co',
  'tech company': 'https://placehold.co/200x200/4476E3/ffffff?text=Tech+Inc',
  'fashion brand': 'https://placehold.co/200x200/A344E3/ffffff?text=Style+Hub',
  'food delivery': 'https://placehold.co/200x200/E3A044/ffffff?text=QuickEats',
  'travel agency': 'https://placehold.co/200x200/44E370/ffffff?text=GoThere',
};

/**
 * Fetches an ad image URL for a given hint.
 * @param hint - The keyword for the ad placement (e.g., 'brand logo').
 * @returns A promise that resolves to the image URL string, or null if not found.
 */
export async function getAdForHint(hint: string): Promise<string | null> {
  // Simulate network delay to mimic a real backend call
  await new Promise(resolve => setTimeout(resolve, 200));

  return adCatalog[hint] || null;
}
