import React from 'react'
import Nav from './Nav1'

function Layout(props: any) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{props.children}</main>
      <footer></footer>

    </>
  )
}

export default Layout
