'use client'
import React from 'react'
import Nav from './Nav1'
import Footer from './Footer'
import { Merriweather } from 'next/font/google'

const Roboto = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: '700'
})

function Layout(props: any, {
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={Roboto.className}>
      <header>
        <Nav />
      </header>
      <main>{props.children}</main>
      <footer><Footer /></footer>

    </div>
  )
}

export default Layout
