import { FaCheck, FaStar } from 'react-icons/fa';
import Footer from '../components/Footer';

const Home = () => {

  const features = [
    { title: 'لوحة تحكم ذكية', description: 'إدارة المهام بسهولة مع واجهة مستخدم بديهية' },
    { title: 'تعاون فريق', description: 'مشاركة المهام والتعليقات في الوقت الحقيقي' },
    { title: 'تقارير متقدمة', description: 'تحليلات وأدوات تقارير قابلة للتخصيص' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              البديل الأقوى لـ Trello
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              إدارة المهام باحترافية مع أدوات تعاون متقدمة
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100">
                التجربة المجانية
              </button>
              <button className="border-2 border-white px-8 py-3 rounded-lg text-lg hover:bg-white hover:text-purple-600">
                مشاهدة العرض التوضيحي
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">لماذا تختارنا؟</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-fit p-4 rounded-full mb-4">
                <FaStar className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">المقارنة مع Trello</h2>
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full text-right">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 border font-semibold">الميزة</th>
                  <th className="px-6 py-4 border font-semibold text-center">Planify</th>
                  <th className="px-6 py-4 border font-semibold text-center">Trello</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-4">التكامل مع الأدوات</td>
                  <td className="px-6 py-4 text-center text-green-600"><FaCheck /></td>
                  <td className="px-6 py-4 text-center text-gray-400"><FaCheck /></td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-4">التقارير المتقدمة</td>
                  <td className="px-6 py-4 text-center text-green-600"><FaCheck /></td>
                  <td className="px-6 py-4 text-center text-gray-400">-</td>
                </tr>
                <tr className="border-t">
                  <td className="px-6 py-4">الدعم الفني 24/7</td>
                  <td className="px-6 py-4 text-center text-green-600"><FaCheck /></td>
                  <td className="px-6 py-4 text-center text-gray-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">جاهز للبدء؟</h2>
          <p className="text-xl mb-8">انضم إلى آلاف الفرق التي تعتمد علينا</p>
          <button className="bg-white text-purple-600 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100">
            إنشاء حساب مجاني
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
