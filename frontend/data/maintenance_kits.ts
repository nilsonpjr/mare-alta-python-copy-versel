import { MaintenanceKit } from '../types/maintenance';

export const INITIAL_MAINTENANCE_KITS: MaintenanceKit[] = [
    {
        id: 'mercury-v8-100h',
        brand: 'Mercury',
        engineModel: 'Verado V8 250/300',
        intervalHours: 100,
        description: 'Revisão de 100 Horas ou 1 Ano (O que ocorrer primeiro)',
        parts: [
            { partNumber: '8M0123456', name: 'Filtro de Óleo Mercury Verado', quantity: 1, unitPrice: 120.00 },
            { partNumber: '92-858037K01', name: 'Óleo Motor 25W40 (Quart)', quantity: 8, unitPrice: 85.00 },
            { partNumber: '8M0000001', name: 'Filtro de Combustível Baixa Pressão', quantity: 1, unitPrice: 150.00 },
            { partNumber: '8M0000002', name: 'Kit Anodos Rabeta', quantity: 1, unitPrice: 450.00 },
            { partNumber: '92-858064K01', name: 'Óleo de Rabeta High Performance', quantity: 1, unitPrice: 110.00 },
        ],
        labor: [
            { description: 'Troca de Óleo e Filtros', hours: 1.5, hourlyRate: 250.00 },
            { description: 'Inspeção Computadorizada (Scanner CDS)', hours: 0.5, hourlyRate: 250.00 },
            { description: 'Lubrificação Geral e Inspeção de Anodos', hours: 1.0, hourlyRate: 250.00 },
        ]
    },
    {
        id: 'mercury-v8-300h',
        brand: 'Mercury',
        engineModel: 'Verado V8 250/300',
        intervalHours: 300,
        description: 'Revisão de 300 Horas ou 3 Anos',
        parts: [
            { partNumber: '8M0123456', name: 'Filtro de Óleo Mercury Verado', quantity: 1, unitPrice: 120.00 },
            { partNumber: '92-858037K01', name: 'Óleo Motor 25W40 (Quart)', quantity: 8, unitPrice: 85.00 },
            { partNumber: '8M0000001', name: 'Filtro de Combustível Baixa Pressão', quantity: 1, unitPrice: 150.00 },
            { partNumber: '8M0000002', name: 'Kit Anodos Rabeta', quantity: 1, unitPrice: 450.00 },
            { partNumber: '92-858064K01', name: 'Óleo de Rabeta High Performance', quantity: 1, unitPrice: 110.00 },
            { partNumber: '8M0000123', name: 'Velas de Ignição Iridium', quantity: 8, unitPrice: 180.00 },
            { partNumber: '8M0000456', name: 'Kit Reparo Bomba D\'água', quantity: 1, unitPrice: 380.00 },
            { partNumber: '8M0000789', name: 'Correia do Alternador', quantity: 1, unitPrice: 420.00 },
        ],
        labor: [
            { description: 'Revisão Completa 300h (Óleos, Filtros, Velas, Rotor)', hours: 5.0, hourlyRate: 250.00 },
            { description: 'Teste de Rodagem', hours: 1.0, hourlyRate: 250.00 },
        ]
    },
    {
        id: 'yamaha-f300-100h',
        brand: 'Yamaha',
        engineModel: 'F300 V6',
        intervalHours: 100,
        description: 'Revisão de 100 Horas - Yamaha',
        parts: [
            { partNumber: '69J-13440-03', name: 'Filtro de Óleo Yamaha', quantity: 1, unitPrice: 140.00 },
            { partNumber: 'YAM-LUBE-4M', name: 'Yamalube 4M 10W-30', quantity: 7, unitPrice: 90.00 },
            { partNumber: '6P2-WS24A-01', name: 'Elemento Filtro Combustível', quantity: 1, unitPrice: 180.00 },
            { partNumber: '90430-08003', name: 'Gaxeta Dreno Óleo', quantity: 1, unitPrice: 15.00 },
        ],
        labor: [
            { description: 'Serviço de Revisão 100h Yamaha', hours: 2.5, hourlyRate: 250.00 },
        ]
    }
];
