import React, { useState, useMemo } from 'react';
import { Check } from 'lucide-react';
import { Contract, PaymentPeriodicity, Subscription } from '../../types/subscription';

interface SubscriptionConfigurationProps {
    contract: Contract;
    initialValues?: {
        periodicity: PaymentPeriodicity;
        selectedOptions: string[];
    };
    mode: 'create' | 'edit';
    onCancel: () => void;
    onSave: (values: { periodicity: PaymentPeriodicity; selectedOptions: string[]; price: number }) => void;
}

export default function SubscriptionConfiguration({
    contract,
    initialValues = { periodicity: 'monthly', selectedOptions: [] },
    mode,
    onCancel,
    onSave
}: SubscriptionConfigurationProps) {
    const [periodicity, setPeriodicity] = useState<PaymentPeriodicity>(initialValues.periodicity);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialValues.selectedOptions);

    const totalPrice = useMemo(() => {
        const basePrice =
            periodicity === 'monthly'
                ? contract.baseMonthlyPrice
                : contract.baseAnnualPrice;

        const optionsPrice = selectedOptions.reduce((sum, optionId) => {
            const option = contract.availableOptions.find(o => o.id === optionId);
            if (!option) return sum;
            return sum + (periodicity === 'monthly' ? option.monthlyPrice : option.annualPrice);
        }, 0);

        return basePrice + optionsPrice;
    }, [contract, periodicity, selectedOptions]);

    const toggleOption = (optionId: string) => {
        setSelectedOptions(prev =>
            prev.includes(optionId)
                ? prev.filter(id => id !== optionId)
                : [...prev, optionId]
        );
    };

    return (
        <div className="space-y-6">
            {/* Periodicity Selection */}
            <div className="bg-white rounded-lg border border-neutral-200">
                <div className="p-6 border-b border-neutral-200">
                    <h2 className="text-neutral-900">
                        {mode === 'create' ? '2. Choisir la périodicité de paiement' : 'Périodicité de paiement'}
                    </h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setPeriodicity('monthly')}
                            className={`p-4 border-2 rounded-lg text-left transition-all ${periodicity === 'monthly'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-neutral-200 hover:border-neutral-300'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-neutral-900">Mensuel</span>
                                {periodicity === 'monthly' && (
                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <p className="text-neutral-600">Paiement tous les mois</p>
                        </button>
                        <button
                            onClick={() => setPeriodicity('annual')}
                            className={`p-4 border-2 rounded-lg text-left transition-all ${periodicity === 'annual'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-neutral-200 hover:border-neutral-300'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-neutral-900">Annuel</span>
                                {periodicity === 'annual' && (
                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <p className="text-neutral-600">Paiement en une fois par an</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Options Selection */}
            <div className="bg-white rounded-lg border border-neutral-200">
                <div className="p-6 border-b border-neutral-200">
                    <h2 className="text-neutral-900">
                        {mode === 'create' ? '3. Choisir les options' : 'Options'}
                    </h2>
                </div>
                <div className="p-6">
                    {contract.availableOptions.length === 0 ? (
                        <p className="text-neutral-500 text-center py-4">
                            Aucune option disponible pour ce contrat
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {contract.availableOptions.map(option => {
                                const isSelected = selectedOptions.includes(option.id);
                                const price =
                                    periodicity === 'monthly' ? option.monthlyPrice : option.annualPrice;

                                return (
                                    <div
                                        key={option.id}
                                        onClick={() => toggleOption(option.id)}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${isSelected
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-neutral-200 hover:border-neutral-300'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-neutral-900">{option.name}</h3>
                                                    <span className="text-blue-600">
                                                        +{price} € {periodicity === 'monthly' ? '/ mois' : '/ an'}
                                                    </span>
                                                </div>
                                                <p className="text-neutral-600">{option.description}</p>
                                            </div>
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isSelected
                                                        ? 'bg-blue-600 border-blue-600'
                                                        : 'border-neutral-300'
                                                    }`}
                                            >
                                                {isSelected && <Check className="w-4 h-4 text-white" />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Summary & Actions */}
            <div className="bg-white rounded-lg border border-neutral-200">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-neutral-600 mb-1">
                                {mode === 'create' ? 'Prix total' : 'Nouveau prix total'}
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-neutral-900">{totalPrice} €</span>
                                <span className="text-neutral-600">
                                    {periodicity === 'monthly' ? '/ mois' : '/ an'}
                                </span>
                            </div>
                            {selectedOptions.length > 0 && (
                                <p className="text-neutral-500 mt-2">
                                    Contrat de base + {selectedOptions.length} option(s)
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={() => onSave({ periodicity, selectedOptions, price: totalPrice })}
                            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {mode === 'create' ? 'Créer la souscription' : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
