import assert from "node:assert/strict";
import test from "node:test";
import { isVideoFile, parseFilename } from "./library.ts";
import { applySourceFilter } from "./use-library.ts";
import type { LibraryTitle } from "./library.ts";

test("parseFilename reads title and year", () => {
  assert.equal(parseFilename("Blade Runner (1982).mkv").title, "Blade Runner");
  assert.equal(parseFilename("Blade Runner (1982).mkv").year, "1982");
  assert.equal(parseFilename("The.Matrix.1999.1080p.BluRay.x264.mp4").title.includes("Matrix"), true);
  assert.equal(parseFilename("The.Matrix.1999.1080p.BluRay.x264.mp4").year, "1999");
  assert.equal(isVideoFile("foo.mp4"), true);
  assert.equal(isVideoFile("notes.txt"), false);
});

function stub(id: string, source: LibraryTitle["source"]): LibraryTitle {
  return {
    id,
    title: id,
    kind: "movie",
    year: "2024",
    runtime: "90m",
    genre: "Drama",
    genres: ["Drama"],
    synopsis: "",
    cast: [],
    director: "",
    rating: 0,
    addedAt: "2024-01-01",
    poster: "",
    still: "",
    accent: "cyan",
    source,
    sourceLabel: source,
  };
}

test("applySourceFilter isolates shared catalogs", () => {
  const local = [stub("f1", "folder")];
  const remote = [stub("p1", "plex"), stub("j1", "jellyfin"), stub("s1", "shared")];
  assert.equal(applySourceFilter("all", local, remote).length, 4);
  assert.deepEqual(
    applySourceFilter("shared", local, remote).map((t) => t.id),
    ["s1"],
  );
  assert.deepEqual(
    applySourceFilter("folder", local, remote).map((t) => t.id),
    ["f1"],
  );
  assert.deepEqual(
    applySourceFilter("plex", local, remote).map((t) => t.id),
    ["p1"],
  );
});
