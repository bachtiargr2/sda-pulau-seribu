import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// const data = [
//   { name: 'Kajian dan DED', value: 25, color: '#0369a1' },
//   { name: 'Dokumen Lingkungan', value: 20, color: '#f97316' },
//   { name: 'RAB', value: 15, color: '#06b6d4' },
//   { name: 'Gambar Desain', value: 15, color: '#0ea5e9' },
//   { name: 'Kontrak', value: 15, color: '#16a34a' },
//   { name: 'As Built Drawing', value: 10, color: '#ec4899' },
// ];
const COLORS = [
    '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6', '#e11d48', '#a855f7',
  ];

export function DocumentChart({data}:any) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="mb-6">Komposisi Dokumen</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_:any, i:any) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
