import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Modal } from '@/components/Modal'
import { useState } from 'react'
import { ChartPopulationInfo } from '@/components/ChartPopulationInfo'
import { Properties } from '@/components/map'

const Map = dynamic(() => import('@/components/map'), { ssr: false })

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [properties, setProperties] = useState<Properties | undefined>(
    undefined
  )

  const HandleSelectNeighborhood = (properties: Properties) => {
    setProperties(properties)
    setModalOpen(true)
  }

  return (
    <>
      <Head>
        <title>Ubirata test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Ubirata</h1>
        <Map
          HandleSelectNeighborhood={HandleSelectNeighborhood}
          data-testid="map"
        />
        {modalOpen && (
          <Modal setModalOpen={setModalOpen}>
            <ChartPopulationInfo properties={properties} />
          </Modal>
        )}
      </main>
    </>
  )
}
