import { observable } from 'mobx'

export class MainStore {
  @observable authenticated = false
  @observable error = null

  @observable data = []
  @observable favourites = []

  @observable selectedGif: null
  @observable modalIsOpen: false

  @observable pageTitle = 'Codenightmares'
  @observable counter = 0

  increment = () => { this.counter++ }
  decrement = () => { this.counter-- }
  addNumber = async () => {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(4)
      }, 1000)
    })
    return result
  }
}
