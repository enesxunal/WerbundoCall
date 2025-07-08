import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            WerbundoCall Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI destekli çağrı merkezi çözümü. Müşteri hizmetlerinizi otomatikleştirin, 
            7/24 hizmet verin ve müşteri memnuniyetini artırın.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin Paneli
            </Link>
            <a
              href="#features"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Özellikler
            </a>
          </div>
        </div>

        <div id="features" className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-3">AI Destekli Yanıtlar</h3>
            <p className="text-gray-600">
              GPT teknolojisi ile akıllı ve doğal yanıtlar. Her firma için özelleştirilebilir promptlar.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-3">Çoklu Dil Desteği</h3>
            <p className="text-gray-600">
              Türkçe, İngilizce ve Almanca dil desteği. Otomatik dil algılama özelliği.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-3">Otomatik E-posta</h3>
            <p className="text-gray-600">
              Her çağrı sonrası otomatik e-posta özeti. Müşteri etkileşimlerini takip edin.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Nasıl Çalışır?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Çağrı Al</h4>
              <p className="text-sm text-gray-600">Müşteri arama yapar</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Ses Yazıya Çevir</h4>
              <p className="text-sm text-gray-600">Google Speech-to-Text</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">AI Yanıtı</h4>
              <p className="text-sm text-gray-600">GPT ile akıllı yanıt</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Sesli Yanıt</h4>
              <p className="text-sm text-gray-600">Google Text-to-Speech</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
