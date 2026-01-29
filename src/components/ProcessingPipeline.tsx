import { Database, Filter, Brain, Cloud, BarChart3, ArrowDown } from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  description: string;
  icon: typeof Database;
  color: string;
  metrics: { label: string; value: string }[];
}

export default function ProcessingPipeline() {
  const stages: Stage[] = [
    {
      id: 1,
      title: 'Data Ingestion',
      description: 'Multi-source satellite data acquisition and validation',
      icon: Database,
      color: 'cyan',
      metrics: [
        { label: 'Sources', value: '12+' },
        { label: 'Rate', value: '2.4 TB/day' },
      ],
    },
    {
      id: 2,
      title: 'Standardization',
      description: 'Format normalization and geo-referencing',
      icon: Filter,
      color: 'blue',
      metrics: [
        { label: 'Formats', value: '8' },
        { label: 'Accuracy', value: '99.9%' },
      ],
    },
    {
      id: 3,
      title: 'AI/ML Fusion',
      description: 'Deep learning analysis and pattern recognition',
      icon: Brain,
      color: 'violet',
      metrics: [
        { label: 'Models', value: '24' },
        { label: 'Processing', value: 'Real-time' },
      ],
    },
    {
      id: 4,
      title: 'Cloud Processing',
      description: 'Distributed computing and storage optimization',
      icon: Cloud,
      color: 'emerald',
      metrics: [
        { label: 'Nodes', value: '156' },
        { label: 'Uptime', value: '99.98%' },
      ],
    },
    {
      id: 5,
      title: 'Unified Dashboard',
      description: 'Integrated insights and actionable intelligence',
      icon: BarChart3,
      color: 'green',
      metrics: [
        { label: 'Users', value: '1.2K+' },
        { label: 'Updates', value: 'Live' },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
      cyan: {
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]',
      },
      blue: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        glow: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]',
      },
      violet: {
        bg: 'bg-violet-500/10',
        text: 'text-violet-400',
        border: 'border-violet-500/30',
        glow: 'shadow-[0_0_20px_rgba(167,139,250,0.3)]',
      },
      emerald: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        glow: 'shadow-[0_0_20px_rgba(52,211,153,0.3)]',
      },
      green: {
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        border: 'border-green-500/30',
        glow: 'shadow-[0_0_20px_rgba(74,222,128,0.3)]',
      },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-200">Processing Pipeline</h2>
        <p className="text-slate-400 mt-2">End-to-end data transformation and intelligence generation</p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {stages.map((stage, index) => {
            const colors = getColorClasses(stage.color);
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="relative">
                <div
                  className={`relative bg-slate-900/50 border ${colors.border} rounded-xl p-6 backdrop-blur-sm hover:${colors.glow} transition-all duration-300 h-full`}
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-xs font-bold ${colors.text}`}>STAGE {stage.id}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">{stage.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{stage.description}</p>
                  </div>

                  <div className="space-y-2">
                    {stage.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">{metric.label}</span>
                        <span className={`font-semibold ${colors.text}`}>{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 ${colors.bg} rounded-full animate-pulse`}></div>
                </div>

                {index < stages.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <div className={`w-6 h-6 ${colors.bg} rounded-full flex items-center justify-center border ${colors.border}`}>
                      <ArrowDown className={`w-4 h-4 ${colors.text} rotate-[-90deg]`} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-green-500/20 -translate-y-1/2 hidden md:block -z-10"></div>
      </div>
    </div>
  );
}
