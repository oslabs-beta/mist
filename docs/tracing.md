# tracing.md

In this file we are requiring opentelemetry dependecies that are necessary in order to configure tracing SDK, spans creation, express autoinstrumentation, and data exportation.

In order to render the metrics we recieve we have to export them via an exporter package that is pointing to a localhost 3000 endpoint. In order to get metrics to the backend you must configure sdk and set traceExporter to be equal to exporter.
