import React from 'react'
import { Wrapper, BodyContainer } from './style'
import { PopulationByNeighborHoods } from '@/@types/populationByNeighborhoods'
import { useFetch } from '@/customHooks/useFetch'

interface Props {
  infos?: []
}

export const Modal = ({ infos }: Props) => {
  const { data, error, loading } = useFetch<PopulationByNeighborHoods>(
    '/api/populationByNeighborhood'
  )

  {
    console.log('pop', data)
  }

  return (
    <Wrapper>
      <BodyContainer></BodyContainer>
    </Wrapper>
  )
}
