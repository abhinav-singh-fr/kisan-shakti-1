import IrrigationControl from '../IrrigationControl';

export default function IrrigationControlExample() {
  return (
    <div className="p-4">
      <IrrigationControl 
        isAutoMode={true}
        isPumpRunning={false}
        flowRate={35.2}
        pressure={3.8}
        tankLevel={85}
      />
    </div>
  );
}