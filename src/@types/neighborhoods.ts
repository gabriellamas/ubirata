export interface NeighborHoods {
  type: string
  name: string
  crs: {
    type: string
    properties: { name: string }
  }
  features: Feature[]
}

export type Feature = {
  type: string
  properties: {
    id: 1
    name: string
    setor: string
    zona: string
  }
  geometry: {
    type: string
    coordinates: [[[[number, number][]]]]
  }
  bbox: [number, number, number, number]
}
