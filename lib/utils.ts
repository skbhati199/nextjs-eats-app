import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function convertIntCurrency(totalRevenue: number) : string {
  const formattedTotalRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalRevenue);
  return formattedTotalRevenue
}