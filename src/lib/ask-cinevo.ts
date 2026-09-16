import { createServerFn } from "@tanstack/react-start";

type CatalogRow = {
  title: string;
  year: string;
  kind: string;
  genre: string;
  rating: number;
  synopsis: string;
};

export const askCinevo = createServerFn({ method: "POST" })
  .validator((input: { question: string; titles?: CatalogRow[] }) => input)
  .handler(async ({ data }) => {
    const question = data.question.trim().slice(0, 400);
    if (!question) return { ok: false as const, error: "Ask something first." };

    const titles = data.titles ?? [];
    if (!titles.length) {
      return { ok: true as const, text: "Your library is empty. Add a folder or sign in with Plex, then ask again." };
    }

    const apiKey = process.env.XAI_API_KEY;
    const catalog = titles
      .slice(0, 80)
      .map((t) => `${t.title} (${t.year}, ${t.kind}, ${t.genre}, ${t.rating}) — ${t.synopsis}`)
      .join("\n");

    if (!apiKey) {
      const q = question.toLowerCase();
      const pick =
        titles.find((t) => q.includes(t.genre.toLowerCase()) || q.includes(t.title.toLowerCase())) ?? titles[0];
      return {
        ok: true as const,
        text: `Tonight I’d put on ${pick.title} (${pick.year}). ${pick.synopsis}`,
      };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 280,
        messages: [
          {
            role: "system",
            content:
              "You are CINEVO’s concierge. Recommend only from the owner’s private catalog. Be concise, cinematic, no hype. Never invent titles.",
          },
          {
            role: "user",
            content: `Catalog:\n${catalog}\n\nQuestion: ${question}`,
          },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: "Concierge is offline right now." };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { ok: true as const, text: body.choices?.[0]?.message?.content ?? "Nothing tonight." };
  });
