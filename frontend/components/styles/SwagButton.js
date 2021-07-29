import styled from 'styled-components'

const SwagButton = styled.button`
  background: red;
  color: white;
  font-weight: 600;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-3deg);
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`

export default SwagButton
