package se.kry.codetest;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.StaticHandler;
import se.kry.codetest.registry.model.Service;
import se.kry.codetest.registry.ServiceRegistry;
import se.kry.codetest.registry.ServiceRegistryFactory;

/**
 * Deploys a verticle that keeps a registry of services and their latest status. It also regularly polls
 * those services and update their status.
 */
public class MainVerticle extends AbstractVerticle {

  private ServiceRegistry registry;
  private BackgroundPoller poller;

  @Override
  public void start(Future<Void> startFuture) {
    final Future<Void> steps = initializeRegistry().compose(v -> initializeHttpServer());
    steps.setHandler(startFuture);
  }

  /**
   * Initializes the registry where the services will be stored.
   */
  private Future initializeRegistry() {
    final Future future = Future.future();
    ServiceRegistryFactory.createInMemoryRegistry(vertx).setHandler(done -> {
      if (done.succeeded()) {
        registry = done.result();
        future.complete();
      } else {
        future.fail(done.cause());
      }
    });
    return future;
  }

  /**
   * Initializes the http server.
   */
  private Future<Void> initializeHttpServer() {
    final Future<Void> future = Future.future();
    poller = new BackgroundPoller(vertx, registry);
    final Router router = Router.router(vertx);

    router.route().handler(CorsHandler.create("*")
            .allowedMethod(io.vertx.core.http.HttpMethod.GET)
            .allowedMethod(io.vertx.core.http.HttpMethod.POST)
            .allowedMethod(io.vertx.core.http.HttpMethod.OPTIONS)
            .allowedHeader("Access-Control-Request-Method")
            .allowedHeader("Access-Control-Allow-Origin")
            .allowedHeader("Access-Control-Allow-Headers")
            .allowedHeader("Content-Type"));

    router.route().handler(BodyHandler.create());
    vertx.setPeriodic(1000 * 60, timerId -> poller.pollServices());
    setRoutes(router);
    vertx
      .createHttpServer()
      .requestHandler(router)
      .listen(8080, result -> {
        if (result.succeeded()) {
          System.out.println("KRY code test service started");
          future.complete();
        } else {
          future.fail(result.cause());
        }
      });
    return future;
}

  /**
   * Set the different routes for this service.
   */
  private void setRoutes(Router router){
    router.route("/*").handler(StaticHandler.create());
    router.get("/service").handler(this::handleGetServices);
    router.post("/service").handler(this::handlePostService);
    router.delete("/service").handler(this::handleDeleteService);
  }

  /**
   * Handles the call to GET /service api.
   * Returns the list of services in the registry.
   */
  private void handleGetServices(RoutingContext routingContext) {
    System.out.println("GET");
    registry.getServices().setHandler(res -> {
      if (res.succeeded()) {
        final List<JsonObject> jsonServices = res.result()
                .stream()
                .map(service ->
                             new JsonObject()
                                     .put("id", service.getId())
                                     .put("name", service.getName())
                                     .put("url", service.getUrl().toString())
                                     .put("status", service.getStatus().toString()))
                .collect(Collectors.toList());
        System.out.println("GET result" + jsonServices.size());

        JsonObject dto = new JsonObject()
                .put("lastUpdate", Instant.now())
                .put("services", new JsonArray(jsonServices));

        routingContext.response()
                .putHeader("content-type", "application/json")
                .end(dto.encode());
      }
    });
  }

  /**
   * Handles the call to POST /service api
   * Add a service to the registry given its name and url.
   * Calling the service twice for the same service will fail.
   */
  private void handlePostService(RoutingContext routingContext) {
    final JsonObject jsonBody = routingContext.getBodyAsJson()
            .getJsonObject("data");
    try {
      registry.addService(jsonBody.getString("name"), jsonBody.getString("url")).setHandler(
              res -> handleResponse(res, routingContext));
    } catch (IllegalArgumentException e) {
        routingContext.response()
                .putHeader("content-type", "application/json")
                .setStatusMessage(e.toString())
                .setStatusCode(400)
                .end();
    }
  }

  /**
   * Handles the call to DELETE /service api
   * Removes a service from the registry.
   * Will do nothing if the service is not in the registry.
   */
  private void handleDeleteService(RoutingContext routingContext) {
    final JsonObject jsonBody = routingContext.getBodyAsJson();
    try {
      registry.removeService(jsonBody.getString("id")).setHandler(
              res -> handleResponse(res, routingContext));
    } catch (IllegalArgumentException e) {
      routingContext.response()
              .putHeader("content-type", "application/json")
              .setStatusMessage(e.toString())
              .setStatusCode(400)
              .end();
    }
  }

  /**
   * Responds with a 204 if the result is successful.
   */
  private void handleResponse(AsyncResult res, RoutingContext routingContext) {
    if (res.succeeded()) {
      routingContext.response()
              .putHeader("content-type", "application/json")
              .setStatusCode(204)
              .end();
    } else {
      routingContext.response()
              .putHeader("content-type", "application/json")
              .setStatusCode(500)
              .setStatusMessage(res.cause().toString())
              .end();
    }
  }
}



