const SearchFilter = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => {
    return (
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="ابحث عن مشاريع..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="in-progress">قيد التنفيذ</option>
          <option value="completed">مكتمل</option>
        </select>
      </div>
    );
  };
  
  export default SearchFilter;