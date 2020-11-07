export default class Filter {
  constructor() {
    this.pokemonId =  { $lte: null, $gte: null}
    this.name = { $regex: "" }
    this.weight = { $lte: null, $gte: null}
    this.height = { $lte: null, $gte: null}
  }
    pokemonId: { $lte: number | null, $gte: number | null} = { $lte: null, $gte: null}
    name: { $regex: String } = { $regex: "" }
    weight: { $lte: number | null, $gte: number | null} = { $lte: null, $gte: null}
    height: { $lte: number | null, $gte: number | null} = { $lte: null, $gte: null}
  }