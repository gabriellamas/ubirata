import React, { ReactNode } from 'react'
import { Wrapper, BodyContainer } from './style'
import { FiX } from 'react-icons/fi'

interface Props {
  setModalOpen: (value: boolean) => void
  children: ReactNode
}

export const Modal = ({ children, setModalOpen }: Props) => {
  return (
    <Wrapper onClick={() => setModalOpen(false)}>
      <BodyContainer>
        <button onClick={() => setModalOpen(false)}>
          <FiX size={22} />
        </button>
        {children}
      </BodyContainer>
    </Wrapper>
  )
}
