import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

const KIND: Record<string, string> = { bot: 'Бот', web: 'Веб', data: 'Данные', iot: 'IoT', audio: 'Аудио' };

export interface SheetFrame { img: ImageMetadata; alt: string; slug: string; label: string; strip: number; i: number; }

/**
 * Раскладывает кадры всех проектов по колонкам «контактного листа».
 * Кадры идут вперемешку (по одному из каждого проекта), каждый следующий падает
 * в самую короткую колонку, чтобы колонки заполнялись ровно.
 */
export function buildSheet(projects: CollectionEntry<'projects'>[], cols = 6, colWidth = 222, target = 1500): SheetFrame[][] {
  const queues = projects.map((p) => p.data.gallery.map((g) => ({ g, p })));
  const mixed: { g: (typeof queues)[0][0]['g']; p: CollectionEntry<'projects'> }[] = [];
  for (let k = 0; queues.some((q) => q[k]); k++) for (const q of queues) if (q[k]) mixed.push(q[k]);

  const columns: SheetFrame[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  let n = 0;
  for (const { g, p } of mixed) {
    if (heights.every((h) => h >= target)) break;
    const c = heights.indexOf(Math.min(...heights));
    const h = (colWidth * g.src.height) / g.src.width + 28 + 12;
    heights[c] += h;
    columns[c].push({ img: g.src, alt: g.alt, slug: p.id, label: `${KIND[p.data.kind]} · ${p.data.year}`, strip: columns[c].length % 4, i: n++ });
  }
  return columns;
}
