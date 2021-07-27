import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  margin-left: 1rem;
  min-width: 2.5rem;
  line-height: 1.8rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`
const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.2s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`

const CartCount = ({ count }) => {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className='count'
          classNames='count'
          key={count}
          timeout={{ enter: 200, exit: 200 }}>
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  )
}

export default CartCount
