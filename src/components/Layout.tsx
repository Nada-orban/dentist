import React from 'react'
import Nav from './Nav1'
import Footer from './Footer'

function Layout(props: any) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{props.children}</main>
      <footer><Footer /></footer>

    </>
  )
}

export default Layout
