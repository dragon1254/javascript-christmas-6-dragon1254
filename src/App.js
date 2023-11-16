import controller from "../domain/controller/controller.js";

class App {
#controller

  constructor() {
    this.#controller = new controller();
  }

  async run() {
    await this.#controller.start();
  }
}

export default App;
