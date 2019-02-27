import Drash from "../mod.ts";
import Response from "./response.ts";
import resources from "/var/www/deno-drash/example-app/resources/.drash_http_resources.ts";

// Drash.Http.Response = Response;

let server1 = new Drash.Http.Server({
  address: "localhost:8000",
  response_output: "application/json",
  resources: resources,
  logger: new Drash.Loggers.ConsoleLogger({
    enabled: true,
    level: "info"
  })
});

server1.run();
