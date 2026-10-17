import useFetch from '../hooks/useFetch'

function Users() {
  // Ambil data dan status loading murni dari custom hook kamu
  const { data, loading } = useFetch('/users?limit=10')
  
  let users = [];
  if (data) {
    if (data.users && Array.isArray(data.users)) {
      users = data.users;
    } else if (Array.isArray(data)) {
      users = data;
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Data Users
      </h1>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm p-20 text-center border border-gray-100">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500 font-medium">Memuat data user...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Nama</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Informasi / Umur</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">
                      {u.firstName || u.name?.firstname || 'N/A'} {u.lastName || u.name?.lastname || ''}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {u.age ? `${u.age} Tahun` : (u.username || '-')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-gray-400 text-sm">
                    Tidak ada data user terdeteksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-center text-sm text-gray-400 mt-4">
        Total: {users.length} user
      </p>
    </div>
  )
}

export default Users
