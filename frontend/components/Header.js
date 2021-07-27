import Link from 'next/link'
import Nav from './Nav'
import styled from 'styled-components'
import Search from './Search'

const Logo = styled.h1`
  background: red;
  font-size: 3.5rem;
  max-width: fit-content;
  margin: 1.2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
  .sub-bar {
    border-bottom: 1px solid var(--black, black);
    display: grid;
    grid-template-columns: 1fr auto;
  }
`

const Header = () => {
  return (
    <HeaderStyles>
      <div className='bar'>
        <Logo>
          <Link href='/'>Swag Store</Link>
        </Logo>
        <Nav />
      </div>
      <div className='sub-bar'>
        <Search />
      </div>
    </HeaderStyles>
  )
}

export default Header
