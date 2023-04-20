import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 1000;
`

export const BodyContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px 24px 48px;
  background: #fff;
  width: 98%;
  height: auto;
  max-width: 1200px;
  max-height: 98%;
  overflow: auto;
  z-index: 1001;
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  button {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 16px;
    background: none;
    border: none;
    z-index: 40;
    &:hover {
      opacity: 0.5;
    }
  }
`
