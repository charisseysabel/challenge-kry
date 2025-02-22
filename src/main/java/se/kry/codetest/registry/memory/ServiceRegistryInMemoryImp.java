package se.kry.codetest.registry.memory;

import io.vertx.core.Future;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Instant;
import java.util.Hashtable;
import java.util.List;
import java.util.stream.Collectors;
import se.kry.codetest.registry.model.Service;
import se.kry.codetest.registry.ServiceRegistry;
import se.kry.codetest.registry.model.ServiceStatus;

/**
 * An in-memory implementation of the service registry.
 */
public class ServiceRegistryInMemoryImp implements ServiceRegistry {
  private final Hashtable<String, Service> registry;

  public ServiceRegistryInMemoryImp() {
    this.registry = new Hashtable<>();
  }

  @Override
  public Future<Boolean> addService(String serviceName, String serviceUrl) throws IllegalArgumentException {
    validateServiceName(serviceName);
    final URL url = validateServiceUrl(serviceUrl);

    final Service service = new Service();
    service.setName(serviceName);
    service.setUrl(url);
    service.setStatus(ServiceStatus.UNKNOWN);
    service.setAddTime(Instant.now());
    this.registry.putIfAbsent(service.getId(), service);
    return Future.succeededFuture(true);
  }

  @Override
  public Future<List<Service>> getServices() {
    return Future.succeededFuture(this.registry.values().stream().collect(Collectors.toList()));
  }

  @Override
  public Future<Boolean> updateServiceStatus(String serviceId, ServiceStatus status) throws IllegalArgumentException {
    if (!this.registry.containsKey(serviceId)) {
      throw new IllegalArgumentException("Service does not exist in the registry");
    }
    final Service service = this.registry.get(serviceId);
    service.setStatus(status);
    this.registry.put(serviceId, service);
    return Future.succeededFuture(true);
  }

  @Override
  public Future<Boolean> updateService(String id, String serviceName, String serviceUrl) throws IllegalArgumentException {
    if (!this.registry.containsKey(id)) {
      throw new IllegalArgumentException("Service could not be found");
    }

    validateServiceName(serviceName);
    final URL url = validateServiceUrl(serviceUrl);

    final Service service = this.registry.get(id);
    service.setName(serviceName);
    service.setUrl(url);
    service.setStatus(ServiceStatus.UNKNOWN);

    this.registry.put(id, service);
    return Future.succeededFuture(true);

  }

  @Override
  public Future<List<Service>> removeService(String serviceId) throws IllegalArgumentException {
    if (!this.registry.containsKey(serviceId)) {
      throw new IllegalArgumentException("Service does not exist in the registry");
    }
    this.registry.remove(serviceId);
    return getServices();
  }

  private void validateServiceName(final String serviceName) throws IllegalArgumentException {
    if (serviceName == null || serviceName.isEmpty()) {
      throw new IllegalArgumentException("Invalid Service name.");
    }
  }

  private URL validateServiceUrl(String serviceUrl) throws IllegalArgumentException {
    try {
      return new URL(serviceUrl);
    } catch (MalformedURLException e) {
      throw new IllegalArgumentException("Malformed url", e);
    }
  }
}
