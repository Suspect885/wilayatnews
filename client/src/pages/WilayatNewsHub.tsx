import { useState } from 'react';
import LiveBroadcastPanel from '../components/LiveBroadcastPanel';
import wilayatData from '@shared/data/wilayat.json';
import channelsData from '@shared/data/channels.json';
import wilayatChannelsData from '@shared/data/wilayat-channels.json';

interface Wilayat {
  id: number;
  name: string;
  englishName: string;
  description: string;
  population: string;
  area: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface Channel {
  id: number;
  name: string;
  englishName: string;
  description: string;
  type: string;
  language: string;
  website: string;
  status: string;
  category: string;
}

interface WilayatChannelMapping {
  wilayatId: number;
  wilayatName: string;
  channelIds: number[];
  localChannels: Array<{
    name: string;
    description: string;
    type: string;
  }>;
}

function WilayatNewsHub() {
  const [selectedWilayatId, setSelectedWilayatId] = useState<number | null>(1);

  const wilayats: Wilayat[] = wilayatData.wilayat;
  const channels: Channel[] = channelsData.channels;
  const mappings: WilayatChannelMapping[] = wilayatChannelsData.wilayatChannels;

  const selectedWilayat = wilayats.find(w => w.id === selectedWilayatId);
  const wilayatMapping = mappings.find(m => m.wilayatId === selectedWilayatId);
  const relatedChannels = wilayatMapping
    ? channels.filter(c => wilayatMapping.channelIds.includes(c.id))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">🗞️ ولايات نيوز</h1>
          <p className="text-blue-100 mt-2">منصة إخبارية موحدة لأخبار الولايات العُمانية</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Wilayat Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">الولايات العُمانية</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {wilayats.map(wilayat => (
                  <button
                    key={wilayat.id}
                    onClick={() => setSelectedWilayatId(wilayat.id)}
                    className={`w-full text-right px-4 py-2 rounded-lg transition-all ${
                      selectedWilayatId === wilayat.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">{wilayat.name}</div>
                    <div className="text-xs opacity-75">{wilayat.englishName}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedWilayat && (
              <>
                {/* Wilayat Info Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {selectedWilayat.name}
                      </h2>
                      <p className="text-xl text-indigo-600 mb-4">
                        {selectedWilayat.englishName}
                      </p>
                      <p className="text-gray-600 mb-4">{selectedWilayat.description}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">السكان</p>
                          <p className="text-lg font-bold text-gray-800">{selectedWilayat.population}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">المساحة</p>
                          <p className="text-lg font-bold text-gray-800">{selectedWilayat.area}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">الخط العرضي</p>
                          <p className="text-xs font-mono text-gray-800">{selectedWilayat.coordinates?.latitude}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">خط الطول</p>
                          <p className="text-xs font-mono text-gray-800">{selectedWilayat.coordinates?.longitude}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Channels Section */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    📺 القنوات الإخبارية المتاحة ({relatedChannels.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedChannels.map(channel => (
                      <div
                        key={channel.id}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-800">{channel.name}</h4>
                            <p className="text-sm text-indigo-600">{channel.englishName}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                            {channel.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                          <div>
                            <span className="font-semibold">النوع:</span> {channel.type}
                          </div>
                          <div>
                            <span className="font-semibold">اللغة:</span> {channel.language}
                          </div>
                          <div className="col-span-2">
                            <span className="font-semibold">التصنيف:</span> {channel.category}
                          </div>
                        </div>
                        <a
                          href={channel.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                        >
                          زيارة الموقع →
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Local Channels */}
                  {wilayatMapping?.localChannels && wilayatMapping.localChannels.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        📻 القنوات المحلية
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wilayatMapping.localChannels.map((channel, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-md p-4"
                          >
                            <h4 className="font-bold text-gray-800 mb-2">{channel.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                            <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
                              {channel.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <LiveBroadcastPanel />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p>© 2024 ولايات نيوز - منصة إخبارية عُمانية موحدة</p>
      </footer>
    </div>
  );
}

export default WilayatNewsHub;
