// Générateur statique DOM AUTO — aucune dépendance.
// Usage : node build.mjs            -> build de production dans docs/
//         node build.mjs --preview  -> idem + avis d'exemple visibles (ne pas publier)
import fs from "node:fs";
import path from "node:path";
import { site } from "./data/site.mjs";
import { layout } from "./src/layout.mjs";
import { home } from "./src/pages/home.mjs";
import { prestations } from "./src/pages/prestations.mjs";
import { garage } from "./src/pages/garage.mjs";
import { rendezVous } from "./src/pages/rendez-vous.mjs";
import { contact } from "./src/pages/contact.mjs";
import { mentions, confidentialite, notFound } from "./src/pages/legal.mjs";

const LOCAL = process.argv.includes("--local");
const OUT = LOCAL ? "apercu-local" : "docs";
// Version "double-clic" : liens vers index.html explicites (fonctionne sans serveur)
const localLinks = (html) =>
  html.replace(/href="((?:\.\.\/|\.\/)*[^":#?]*?)\/?((?:\?[^"#]*)?(?:#[^"]*)?)"/g, (m, p, rest) => {
    if (/^(https?:|tel:|mailto:|\/)/.test(p) || /\.(css|svg|png|jpg|webp|avif|html|xml|txt)$/.test(p)) return m;
    if (m.startsWith('href="#')) return m;
    const base = p === "" || p === "." || /^(\.\.\/)*\.?\.?$/.test(p) ? p.replace(/\.$/, "") : p + "/";
    return `href="${base.replace(/\/\/$/, "/")}index.html${rest}"`;
  });

// Typographie française : espace insécable avant ? ! : ; » et après « (hors <script>)
const typo = (html) =>
  html
    .split(/(<script[\s\S]*?<\/script>)/)
    .map((chunk, i) => (i % 2 ? chunk : chunk.replace(/>([^<]+)</g, (m, t) => ">" + t.replace(/ ([?!:;»])/g, "\u00a0$1").replace(/« /g, "«\u00a0") + "<")))
    .join("");
const pages = [home, prestations, garage, rendezVous, contact, mentions, confidentialite, notFound];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const page of pages) {
  const isFile = page.path.endsWith(".html");
  const depth = isFile ? 0 : page.path.split("/").filter(Boolean).length;
  // La 404 peut être servie à n'importe quelle profondeur : liens absolus depuis la racine du domaine.
  const root = page === notFound ? "/" : "../".repeat(depth);
  const html = layout({ ...page, root, body: page.body(root) });
  const file = isFile ? path.join(OUT, page.path) : path.join(OUT, page.path, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, (LOCAL ? localLinks : (x) => x)(typo(html)).replace(/\n\s*\n/g, "\n"));
}

fs.cpSync("assets", path.join(OUT, "assets"), { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex);
fs.writeFileSync(
  path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((p) => `  <url><loc>${site.url}/${p.path}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`
);
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

console.log(`✓ ${pages.length} pages générées dans ${OUT}/${site.showDevReviews ? " (PREVIEW : avis d'exemple visibles, ne pas publier)" : ""}`);
