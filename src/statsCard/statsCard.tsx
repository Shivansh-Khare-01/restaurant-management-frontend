export const StatsCard = ({ title, value, subtitle, icon: Icon, color = "blue" }:any) => (
  <div className={`stats-card ${color}`}>
    <div className="info">
      <p className="title">{title}</p>
      <p className="value">{value}</p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
    {Icon && (
      <div className="icon-wrapper">
        <Icon size={24} />
      </div>
    )}
  </div>
);