// Dev-only preload: intercepts fetch() to formsubmit.co so no real submission leaves this machine.
import fs from "node:fs";
const DIR = process.env.FSMOCK_DIR;
const real = globalThis.fetch;
globalThis.fetch = async function (input, init = {}) {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (!/^https:\/\/(formsubmit\.co|hooks\.example\.test)\//.test(url)) return real.call(this, input, init);
  const headers = Object.fromEntries(new Headers(init.headers).entries());
  fs.appendFileSync(`${DIR}/requests.log`, JSON.stringify({ at: new Date().toISOString(), url, headers, body: JSON.parse(init.body) }) + "\n");
  const mode = JSON.parse(fs.readFileSync(`${DIR}/mode.json`, "utf8"));
  await new Promise((resolve, reject) => {
    const t = setTimeout(resolve, mode.delay ?? 0);
    init.signal?.addEventListener("abort", () => { clearTimeout(t); reject(init.signal.reason); });
  });
  if (mode.kind === "http500") return new Response("oops", { status: 500 });
  const bodies = {
    success: { success: "true", message: "The form was submitted successfully." },
    activation: { success: "false", message: "This form needs Activation. We've sent you an email containing an 'Activate Form' link. Just click it and your form will be actived!" },
    webserver: { success: "false", message: "Make sure you open this page through a web server, FormSubmit will not work in pages browsed as HTML files." },
  };
  return new Response(JSON.stringify(bodies[mode.kind]), { status: 200, headers: { "Content-Type": "application/json" } });
};
