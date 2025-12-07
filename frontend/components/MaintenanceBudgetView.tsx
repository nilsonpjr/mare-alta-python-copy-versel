import React, { useState } from 'react';
import { ApiService } from '../services/api';
import { INITIAL_MAINTENANCE_KITS } from '../data/maintenance_kits';
import { MaintenanceKit, calculateKitTotal } from '../types/maintenance';
import { Settings, FileText, CheckCircle, PenTool, Printer, ChevronRight, Calculator, AlertCircle } from 'lucide-react';

export const MaintenanceBudgetView: React.FC = () => {
    // Selection State
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [selectedInterval, setSelectedInterval] = useState<number | null>(null);

    // Filter Logic
    const availableBrands = Array.from(new Set(INITIAL_MAINTENANCE_KITS.map(k => k.brand)));

    const availableModels = selectedBrand
        ? Array.from(new Set(INITIAL_MAINTENANCE_KITS
            .filter(k => k.brand === selectedBrand)
            .map(k => k.engineModel)))
        : [];

    const availableIntervals = selectedBrand && selectedModel
        ? INITIAL_MAINTENANCE_KITS
            .filter(k => k.brand === selectedBrand && k.engineModel === selectedModel)
            .map(k => k.intervalHours)
            .sort((a, b) => a - b)
        : [];

    const selectedKit = selectedBrand && selectedModel && selectedInterval
        ? INITIAL_MAINTENANCE_KITS.find(k =>
            k.brand === selectedBrand &&
            k.engineModel === selectedModel &&
            k.intervalHours === selectedInterval)
        : null;

    // Formatting
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-cyan-600" />
                    Orçador de Revisões Padronizadas
                </h2>
                <p className="text-slate-500">Gere orçamentos técnicos de revisão em segundos baseados nos kits de fábrica.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT PANEL: SELECTION */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
                    <h3 className="font-bold text-slate-700 mb-4 uppercase text-sm tracking-wide border-b pb-2">1. Selecione o Motor</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Fabricante</label>
                            <div className="grid grid-cols-2 gap-2">
                                {availableBrands.map(brand => (
                                    <button
                                        key={brand}
                                        onClick={() => {
                                            setSelectedBrand(brand);
                                            setSelectedModel('');
                                            setSelectedInterval(null);
                                        }}
                                        className={`p-3 rounded border text-sm font-semibold transition-all ${selectedBrand === brand
                                                ? 'bg-slate-800 text-white border-slate-800 shadow-lg'
                                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                                            }`}
                                    >
                                        {brand}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedBrand && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block text-sm font-medium text-slate-600 mb-1">Modelo do Motor</label>
                                <select
                                    className="w-full p-2.5 border rounded-lg bg-slate-50 text-slate-800 focus:ring-2 focus:ring-cyan-500 outline-none"
                                    value={selectedModel}
                                    onChange={(e) => {
                                        setSelectedModel(e.target.value);
                                        setSelectedInterval(null);
                                    }}
                                >
                                    <option value="">Selecione o modelo...</option>
                                    {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                        )}

                        {selectedModel && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block text-sm font-medium text-slate-600 mb-1">Revisão de (Horas)</label>
                                <div className="flex flex-wrap gap-2">
                                    {availableIntervals.map(hours => (
                                        <button
                                            key={hours}
                                            onClick={() => setSelectedInterval(hours)}
                                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${selectedInterval === hours
                                                    ? 'bg-cyan-600 text-white border-cyan-600 shadow'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-400'
                                                }`}
                                        >
                                            {hours}h
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL: BUDGET PREVIEW */}
                <div className="lg:col-span-2">
                    {selectedKit ? (
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            {/* Header */}
                            <div className="bg-slate-800 text-white p-6 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-cyan-400" />
                                        Orçamento Revisão {selectedKit.intervalHours} Horas
                                    </h3>
                                    <p className="text-slate-400 text-sm mt-1">{selectedKit.brand} • {selectedKit.engineModel}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-slate-400 uppercase tracking-widest">Valor Total Estimado</div>
                                    <div className="text-3xl font-bold text-cyan-400">{formatCurrency(calculateKitTotal(selectedKit))}</div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-8">

                                {/* Parts Section */}
                                <div>
                                    <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2 pb-2 border-b">
                                        <Settings className="w-4 h-4 text-slate-400" />
                                        Peças & Insumos Originais
                                    </h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-slate-50 text-slate-500 font-semibold">
                                                <tr>
                                                    <th className="p-2">PN</th>
                                                    <th className="p-2">Item</th>
                                                    <th className="p-2 text-center">Qtd</th>
                                                    <th className="p-2 text-right">Unitário</th>
                                                    <th className="p-2 text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {selectedKit.parts.map((part, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50">
                                                        <td className="p-2 font-mono text-xs text-slate-500">{part.partNumber}</td>
                                                        <td className="p-2 font-medium text-slate-800">{part.name}</td>
                                                        <td className="p-2 text-center text-slate-600">{part.quantity}</td>
                                                        <td className="p-2 text-right text-slate-600">{formatCurrency(part.unitPrice)}</td>
                                                        <td className="p-2 text-right font-bold text-slate-700">{formatCurrency(part.quantity * part.unitPrice)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Labor Section */}
                                <div>
                                    <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2 pb-2 border-b">
                                        <PenTool className="w-4 h-4 text-slate-400" />
                                        Mão de Obra Especializada
                                    </h4>
                                    <div className="space-y-2">
                                        {selectedKit.labor.map((serv, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm">{serv.description}</p>
                                                    <p className="text-xs text-slate-500">Tempo Estimado: {serv.hours}h (taxa: {formatCurrency(serv.hourlyRate)}/h)</p>
                                                </div>
                                                <div className="font-bold text-slate-700">{formatCurrency(serv.hours * serv.hourlyRate)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                                    <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                                        <Printer className="w-4 h-4" />
                                        Imprimir / PDF
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg shadow hover:shadow-lg hover:from-cyan-500 hover:to-blue-500 transition-all font-bold">
                                        <CheckCircle className="w-4 h-4" />
                                        Gerar Pré-Ordem
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-10 text-center">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <Calculator className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-600">Nenhum Orçamento Gerado</h3>
                            <p className="text-slate-400 max-w-sm mt-2">
                                Selecione a marca, modelo e intervalo de horas ao lado para visualizar os itens da revisão e valores detalhados.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
