const opentelemetry = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-http');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { MultiSpanProcessor } = require('@opentelemetry/tracing');
const { BatchSpanProcessor } = require('@opentelemetry/tracing');


const exporter = new OTLPTraceExporter({
  url: 'http://localhost:3000/v1/traces',
});

//const spProcessor = new SimpleSpanProcessor({})

const sdk = new opentelemetry.NodeSDK({
  // traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  traceExporter: exporter,
  //can we add in some sort of collector here?? or processor?
  // batchProcessor
  //spanProcessor: spProcessor,
  spanProcessor: MultiSpanProcessor,
  instrumentations: [getNodeAutoInstrumentations()],
});

// batch processor

sdk.start();


// const spanProcessor = (_c = configuration.spanProcessor) !== null && _c !== void 0 ? _c : new sdk_trace_base_1.BatchSpanProcessor(configuration.traceExporter);