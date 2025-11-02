interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
  }

  export function StatCard({ title, value, icon }: StatCardProps) {
    return (
      <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 className="text-gray-600 mb-4">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-4xl">{value}</span>
          <div className="w-20 h-20 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    );
  }
