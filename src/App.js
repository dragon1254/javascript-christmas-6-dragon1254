import controller from "../domain/controller/controller.js";

class App {
#controller

  constructor() {
    this.#controller = new controller();
  }

  async run() {
    this.#controller.start();
  }
}

export default App;
