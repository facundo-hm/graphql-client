type Query<T, F> = Pick<T, Extract<keyof T, F>>

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

type GrandToursData<F> = Data<F, GrandTour, 'grandTours'>

interface Rider {
  id: string
  name: string
  country: string
  status: string
}

type RidersData<F> = Data<F, Rider, 'riders'>

interface TourWinner {
  grandTour: GrandTour
  winner: Rider
}

interface TourEdition {
  id: string
  year: number
  toursEditions: TourWinner[]
}

type EditionsData<F> = Data<F, TourEdition, 'editions'>
