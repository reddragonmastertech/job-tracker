/**
 * TODO: Route GET requests to getJobs, getJob, getInterviews, or getAnalysis
 * based on the action query parameter.
 */
function doGet(e) {
  try {
    assertToken(e);
    return json(ok({}));
  } catch (error) {
    return json(err(error));
  }
}

/**
 * TODO: Route POST requests to create, update, or delete a job or interview
 * based on the action in the JSON body.
 */
function doPost(e) {
  try {
    assertToken(e);
    return json(ok({}));
  } catch (error) {
    return json(err(error));
  }
}
