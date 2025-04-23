

const Footer = () => {
  return (
    <>
     <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Planify</h3>
              <p className="text-gray-400">الحل الأمثل لإدارة المهام والتعاون الفعّال</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">من نحن</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">الوظائف</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">الاتصال</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">الموارد</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">المدونة</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">الوثائق</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">الدعم</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">التواصل</h4>
              <p className="text-gray-400">mail : support@taskflow.com</p>
              <p className="text-gray-400">phone : 966 123 456 789+</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
