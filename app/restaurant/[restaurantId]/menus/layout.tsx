import React from 'react'

export default function MenuLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { restaurantId: string };
  }) {
  return (
    <div>
      {children}
    </div>
  )
}
