import moment from 'moment';

export const Info = ({
  osType,
  upTime,
  cpuModel,
  cpusNumOfCores,
  cpuSpeed,
  macA,
}) => {
  return (
    <div className="cpu-info">
      <h3>Operating System</h3>
      <div className="widget-text">{osType}</div>
      <h3>Time Online</h3>
      <div className="widget-text">{moment.duration(upTime).humanize()}</div>
      <h3>Processor information</h3>
      <div className="widget-text">
        <strong>Type:</strong> {cpuModel}
      </div>
      <div className="widget-text">
        <strong>Number of Cores:</strong> {cpusNumOfCores}
      </div>
      <div className="widget-text">
        <strong>Clock Speed:</strong> {cpuSpeed}
      </div>
    </div>
  );
};
