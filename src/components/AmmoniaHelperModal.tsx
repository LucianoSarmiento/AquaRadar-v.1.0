import React, { useState } from 'react';
import { getAmmoniaLimitTable1, getAmmoniaLimitTable2 } from '../data/ammoniaTables';
import { X, Waves, Table, Info, Check } from 'lucide-react';

interface AmmoniaHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AmmoniaHelperModal: React.FC<AmmoniaHelperModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tableType, setTableType] = useState<'TABLE1' | 'TABLE2'>('TABLE1');
  const [testTemp, setTestTemp] = useState<number>(20);
  const [testPH, setTestPH] = useState<number>(7.5);
  const [testSalinity, setTestSalinity] = useState<number>(30);

  if (!isOpen) return null;

  const calculatedLimit =
    tableType === 'TABLE1'
      ? getAmmoniaLimitTable1(testTemp, testPH)
      : getAmmoniaLimitTable2(testTemp, testPH, testSalinity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900/85 backdrop-blur-2xl rounded-2xl shadow-2xl max-w-2xl w-full border border-white/20 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-950/60 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/20">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Tablas Oficiales de Amoniaco Total (NH3)
              </h3>
              <p className="text-xs text-slate-300">
                Límites dinámicos según D.S. N° 004-2017-MINAM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Table Selector Tabs */}
          <div className="flex bg-slate-950/70 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setTableType('TABLE1')}
              className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs transition ${
                tableType === 'TABLE1'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tabla N° 1: Agua Dulce (Cat. 1, 2-C4, 4-E1, 4-E2)
            </button>
            <button
              onClick={() => setTableType('TABLE2')}
              className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs transition ${
                tableType === 'TABLE2'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tabla N° 2: Agua Marina y Estuarios (Cat. 4-E3)
            </button>
          </div>

          {/* Interactive Calculator Box */}
          <div className="bg-white/[0.04] border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-md space-y-4">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <Table className="h-4 w-4 text-cyan-400" />
              Calculadora y Verificador de Límite Dinámico
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
                  Temperatura (°C)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="35"
                  value={testTemp}
                  onChange={e => setTestTemp(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs px-3 py-2 bg-slate-950/70 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
                  pH
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="6.0"
                  max="9.0"
                  value={testPH}
                  onChange={e => setTestPH(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs px-3 py-2 bg-slate-950/70 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              {tableType === 'TABLE2' && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1.5">
                    Salinidad (g/kg o PSU)
                  </label>
                  <select
                    value={testSalinity}
                    onChange={e => setTestSalinity(parseInt(e.target.value))}
                    className="w-full text-xs px-3 py-2 bg-slate-950/70 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition"
                  >
                    <option value={10} className="bg-slate-900 text-white">10 g/kg (Estuarina baja)</option>
                    <option value={20} className="bg-slate-900 text-white">20 g/kg (Estuarina media)</option>
                    <option value={30} className="bg-slate-900 text-white">30 g/kg (Agua de mar típica)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Calculated Result Banner */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-cyan-400/40 flex items-center justify-between shadow-lg">
              <div>
                <span className="text-slate-300 text-xs">Límite ECA de Amoniaco Resultante:</span>
                <div className="text-xl font-bold text-cyan-300 font-mono mt-0.5">
                  {calculatedLimit !== null ? `${calculatedLimit} mg/L` : 'Fuera de rango normativo'}
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-400 space-y-0.5">
                <div>Temp evaluada: <span className="text-white font-semibold">{testTemp} °C</span></div>
                <div>pH evaluado: <span className="text-white font-semibold">{testPH}</span></div>
                {tableType === 'TABLE2' && <div>Salinidad: <span className="text-white font-semibold">{testSalinity} g/kg</span></div>}
              </div>
            </div>
          </div>

          {/* Normative Note */}
          <div className="bg-white/[0.03] p-4 rounded-xl border border-white/10 text-slate-300 space-y-2 leading-relaxed">
            <h5 className="font-bold text-white flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-cyan-400" />
              Principio Normativo del Amoniaco No Ionizado
            </h5>
            <p>
              El D.S. N° 004-2017-MINAM establece que la toxicidad del amoniaco en ambientes acuáticos depende de la proporción de amoniaco no ionizado (NH3), la cual aumenta exponencialmente a mayor pH y mayor temperatura.
            </p>
            <p>
              Por ello, la norma no fija un límite único estático, sino una matriz oficial de valores máximos permisibles calculados con precisión en las Tablas N° 1 y 2 del Anexo.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950/60 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 active:scale-98"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
