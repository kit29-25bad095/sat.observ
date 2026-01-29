import { Sprout, AlertTriangle, CloudRain, Building2, TrendingUp, Activity } from 'lucide-react';

interface Impact {
  id: number;
  title: string;
  description: string;
  icon: typeof Sprout;
  metrics: { value: string; label: string }[];
  color: string;
  status: string;
}

export default function ImpactMetrics() {
  const impacts: Impact[] = [
    {
      id: 1,
      title: 'Precision Agriculture',
      description: 'Crop health monitoring and yield optimization',
      icon: Sprout,
      metrics: [
        { value: '3.2M', label: 'Hectares Monitored' },
        { value: '+18%', label: 'Yield Improvement' },
      ],
      color: 'green',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Disaster Response',
      description: 'Early warning systems and damage assessment',
      icon: AlertTriangle,
      metrics: [
        { value: '<30min', label: 'Alert Time' },
        { value: '847', label: 'Lives Saved (2024)' },
      ],
      color: 'orange',
      status: 'Critical',
    },
    {
      id: 3,
      title: 'Climate Monitoring',
      description: 'Global environmental change tracking',
      icon: CloudRain,
      metrics: [
        { value: '156', label: 'Active Sensors' },
        { value: '99.7%', label: 'Data Coverage' },
      ],
      color: 'cyan',
      status: 'Active',
    },
    {
      id: 4,
      title: 'Urban Planning',
      description: 'Smart city development and infrastructure',
      icon: Building2,
      metrics: [
        { value: '89', label: 'Cities Tracked' },
        { value: '-23%', label: 'Carbon Reduction' },
      ],
      color: 'blue',
      status: 'Active',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
      green: {
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        border: 'border-green-500/30',
        icon: 'bg-green-500/20',
      },
      orange: {
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        icon: 'bg-orange-500/20',
      },
      cyan: {
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        icon: 'bg-cyan-500/20',
      },
      blue: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        icon: 'bg-blue-500/20',
      },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-200">Real-World Impact</h2>
        <p className="text-slate-400 mt-2">Transforming satellite data into actionable insights across critical sectors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impacts.map((impact) => {
          const colors = getColorClasses(impact.color);
          const Icon = impact.icon;

          return (
            <div
              key={impact.id}
              className={`relative bg-slate-900/50 border ${colors.border} rounded-xl p-6 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className={`w-3 h-3 ${colors.text} animate-pulse`} />
                  <span className={`text-xs ${colors.text} font-medium`}>{impact.status}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-200 mb-2">{impact.title}</h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">{impact.description}</p>

              <div className={`border-t ${colors.border} pt-4 space-y-3`}>
                {impact.metrics.map((metric, index) => (
                  <div key={index}>
                    <div className={`text-2xl font-bold ${colors.text} mb-1`}>{metric.value}</div>
                    <div className="text-xs text-slate-500">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 ${colors.bg} rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-green-500/10 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Global Intelligence Network</h3>
            <p className="text-sm text-slate-400">Real-time insights powering decisions across 127 countries</p>
          </div>
          <div className="flex items-center space-x-8">
            <div>
              <div className="text-3xl font-bold text-cyan-400">2.4 PB</div>
              <div className="text-xs text-slate-400">Data Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">47ms</div>
              <div className="text-xs text-slate-400">Avg Latency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">12.5K</div>
              <div className="text-xs text-slate-400">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
