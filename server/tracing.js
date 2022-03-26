const opentelemetry = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-http');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');

class ConsoleSpanExporter {
  /**
   * Export spans.
   * @param spans
   * @param resultCallback
   */
  export(spans, resultCallback) {
    return this._sendSpans(spans, resultCallback);
  }
  /**
   * Shutdown the exporter.
   */
  shutdown() {
    this._sendSpans([]);
    return Promise.resolve();
  }
  /**
   * converts span info into more readable format
   * @param span
   */
  _exportInfo(span) {
    return {
      traceId: span.spanContext().traceId,
      parentId: span.parentSpanId,
      name: span.name,
      id: span.spanContext().spanId,
      kind: span.kind,
      timestamp: core_1.hrTimeToMicroseconds(span.startTime),
      duration: core_1.hrTimeToMicroseconds(span.duration),
      attributes: span.attributes,
      status: span.status,
      events: span.events,
    };
  }
  /**
   * Showing spans in console
   * @param spans
   * @param done
   */
  _sendSpans(spans, done) {
    for (const span of spans) {
      console.log(this._exportInfo(span));
    }
    if (done) {
      return done({ code: core_1.ExportResultCode.SUCCESS });
    }
  }
}

const exporter = new OTLPTraceExporter({
  url: 'http://localhost:3000/v1/traces',
  headers: {
    //method: "POST"
  },
});

const sdk = new opentelemetry.NodeSDK({
  // traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
