const opentelemetry = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-http');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');

const exporter = new OTLPTraceExporter({
  url: 'http://localhost:3000/v1/traces',
});

const sdk = new opentelemetry.NodeSDK({
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
