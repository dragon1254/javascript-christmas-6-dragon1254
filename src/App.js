import controller from "../domain/controller/controller";

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
