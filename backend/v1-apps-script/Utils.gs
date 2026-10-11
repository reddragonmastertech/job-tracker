/**
 * TODO: Serialize a response body as JSON for the Web App.
 */
function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/**
 * TODO: Wrap a successful payload as { ok: true, data }.
 */
function ok(data) {
  return { ok: true, data: data === undefined ? {} : data };
}

/**
 * TODO: Wrap a failure as { ok: false, error }.
 */
function err(error) {
  var message = error && error.message ? error.message : String(error);
  return { ok: false, error: message };
}

/**
 * TODO: Read the shared token from the query string or JSON body and reject
 * the request when it does not match the API_TOKEN script property.
 * Web Apps do not receive the Authorization header.
 */
function assertToken(e) {
  var provided = e && e.parameter && e.parameter.token ? e.parameter.token : "";
  var expected = PropertiesService.getScriptProperties().getProperty("API_TOKEN");

  if (!expected || provided !== expected) {
    throw new Error("Unauthorized");
  }

  return {};
}
