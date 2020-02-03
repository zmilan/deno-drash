import Drash from "../mod.ts";

export default class CoffeeResource extends Drash.Http.Resource {
  static paths = ["/coffee", "/coffee/:id"];

  protected coffee = {
    17: {
      name: "Light"
    },
    18: {
      name: "Medium"
    },
    19: {
      name: "Dark"
    }
  };

  public GET() {
    let coffeeId = this.request.getPathParam("id");
    const location = this.request.getQueryParam("location");

    if (location) {
      if (location == "from_body") {
        coffeeId = this.request.getBodyParam("id");
      }
    }

    if (!coffeeId) {
      this.response.body = "Please specify a coffee ID.";
      return this.response;
    }

    this.response.body = this.getCoffee(coffeeId);
    return this.response;
  }

  protected getCoffee(coffeeId: number) {
    let coffee = null;

    try {
      coffee = this.coffee[coffeeId];
    } catch (error) {
      throw new Drash.Exceptions.HttpException(
        400,
        `Error getting coffee with ID "${coffeeId}". Error: ${error.message}.`
      );
    }

    if (!coffee) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Coffee with ID "${coffeeId}" not found.`
      );
    }

    return coffee;
  }
}