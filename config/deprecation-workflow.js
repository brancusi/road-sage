window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-string-utils.fmt" },
    { handler: "silence", matchId: "ember-resolver.legacy-shims" },
    { handler: "silence", matchId: "ember-load-initializers.legacy-shims" },
    { handler: "silence", matchId: "ember-application.injected-container" },
    { handler: "silence", matchId: "ember-string-utils.fmt" },
    { handler: "silence", matchId: "ember-metal.merge" }
  ]
};
