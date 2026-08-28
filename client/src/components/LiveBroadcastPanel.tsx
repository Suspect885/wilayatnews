import { Radio, ExternalLink } from 'lucide-react';

const owncastUrl = (import.meta.env.VITE_OWNCAST_URL as string | undefined)?.trim();

export default function LiveBroadcastPanel() {
  const embedUrl = owncastUrl ? `${owncastUrl.replace(/\/$/, '')}/embed/video` : '';

  return (
    <section className="mt-8 rounded-2xl bg-slate-950 p-5 text-white shadow-xl" aria-labelledby="live-broadcast-title">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-emerald-300">
            <Radio className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-semibold">بث مفتوح المصدر</span>
          </div>
          <h2 id="live-broadcast-title" className="text-2xl font-bold">البث المباشر</h2>
        </div>
        <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200">Owncast</span>
      </div>

      {embedUrl ? (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
          <iframe
            title="البث المباشر لولايات"
            src={embedUrl}
            className="aspect-video w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center">
          <p className="mb-2 text-lg font-semibold">لم تتم تهيئة خادم البث بعد</p>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-300">
            أضف رابط خادم Owncast في المتغير VITE_OWNCAST_URL، ثم سيظهر المشغّل هنا تلقائيًا دون تخزين أي مفتاح سري داخل الواجهة.
          </p>
        </div>
      )}

      {owncastUrl && (
        <a
          href={owncastUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
        >
          فتح صفحة البث
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </section>
  );
}
