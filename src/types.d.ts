type Query<T, K> = Pick<T, Extract<keyof T, K>>

type Data<F, T, K> = { [keys in K]: Array<Query<T, F>> }

interface GrandTour {
  id: string
  name: string
  date: string
  region: string
  firstEdition: number
  editions: number
  jerseyColor: string
}

type GrandTourData<F> = Data<F, GrandTour, 'grandTours'>

interface Rider {
  id: string
  name: string
  country: string
  status: string
}

type RidersData<F> = Data<F, Rider, 'riders'>
