export default class Filter {
  constructor() {
    this.pokemonId =  { lte: 898, gte: 1}
    this.name = ""
    this.weight = { lte: null, gte: null}
    this.height = { lte: null, gte: null}
    this.orderby = "pokemonID"
  }
    pokemonId: { lte: number | null, gte: number | null} = { lte: 989, gte: 1}
    name: string = ""
    weight: { lte: number | null, gte: number | null} = { lte: null, gte: null}
    height: { lte: number | null, gte: number | null} = { lte: null, gte: null}
    orderby: String = "pokemonID"
  }