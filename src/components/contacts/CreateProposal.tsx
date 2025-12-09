import React, { useState } from 'react';
import { ArrowLeft, FileText, Check, Plus, Trash2, ShoppingBag, FileBadge } from 'lucide-react';
import { Client } from '../../types';
import { Proposal, ProposalType } from '../../types/contact';

interface CreateProposalProps {
    client: Client;
    onBack: () => void;
    onCreate: (proposals: Proposal[]) => void;
}

const CONTRACT_CATEGORIES = [
    'Assurance',
    'Téléphonie mobile',
    'Santé',
    'Surveillance'
];

const PRODUCT_CATEGORIES = [
    'Livret A',
    'Assurance Vie',
    'PEL',
    'PER',
    'Compte Titres'
];

export default function CreateProposal({
    client,
    onBack,
    onCreate
}: CreateProposalProps) {
    const [addedProposals, setAddedProposals] = useState<Proposal[]>([]);

    // Form State
    const [proposalType, setProposalType] = useState<ProposalType>('contrat');
    const [selectedContractCategory, setSelectedContractCategory] = useState(CONTRACT_CATEGORIES[0]);
    const [selectedProductCategory, setSelectedProductCategory] = useState(PRODUCT_CATEGORIES[0]);
    const [description, setDescription] = useState('');

    const handleAddProposal = () => {
        const itemName = proposalType === 'contrat' ? selectedContractCategory : selectedProductCategory;

        const newProposal: Proposal = {
            id: `PROP-${Date.now()}`,
            type: proposalType,
            itemId: `ITEM-${Date.now()}`,
            itemName: itemName,
            annotation: description,
            createdDate: new Date().toISOString()
        };

        setAddedProposals([...addedProposals, newProposal]);

        // Reset form
        setDescription('');
        // Keep category selection as is for convenience
    };

    const handleRemoveProposal = (id: string) => {
        setAddedProposals(addedProposals.filter(p => p.id !== id));
    };

    const handleSubmit = () => {
        if (addedProposals.length > 0) {
            onCreate(addedProposals);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-5xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-neutral-600" />
                        </button>
                        <div>
                            <p className="text-neutral-500">Réaliser l'entretien</p>
                            <h1 className="text-neutral-900">Nouvelle proposition - {client.name}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Formulaire d'ajout */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border border-neutral-200 p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-blue-600" />
                                Ajouter une proposition
                            </h2>

                            <div className="space-y-6">
                                {/* Type */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-3">Type</label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setProposalType('contrat')}
                                            className={`flex-1 p-3 border rounded-lg flex items-center justify-center gap-2 transition-all ${proposalType === 'contrat'
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                                                }`}
                                        >
                                            <FileBadge className="w-4 h-4" />
                                            Contrat
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setProposalType('produit')}
                                            className={`flex-1 p-3 border rounded-lg flex items-center justify-center gap-2 transition-all ${proposalType === 'produit'
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                    : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                                                }`}
                                        >
                                            <ShoppingBag className="w-4 h-4" />
                                            Produit
                                        </button>
                                    </div>
                                </div>

                                {/* Catégorie Contrat */}
                                {proposalType === 'contrat' && (
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Catégorie de contrat <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={selectedContractCategory}
                                            onChange={(e) => setSelectedContractCategory(e.target.value)}
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {CONTRACT_CATEGORIES.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Catégorie Produit */}
                                {proposalType === 'produit' && (
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Type de produit <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={selectedProductCategory}
                                            onChange={(e) => setSelectedProductCategory(e.target.value)}
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {PRODUCT_CATEGORIES.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Note / Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Détails..."
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        onClick={handleAddProposal}
                                        type="button"
                                        className="w-full py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Ajouter à la liste
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Liste des propositions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border border-neutral-200 p-6 h-full flex flex-col">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                Propositions ({addedProposals.length})
                            </h2>

                            <div className="flex-1 overflow-y-auto min-h-[300px] space-y-3 mb-6">
                                {addedProposals.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-100 rounded-lg p-8">
                                        <FileBadge className="w-12 h-12 mb-3 opacity-20" />
                                        <p>Aucune proposition ajoutée</p>
                                    </div>
                                ) : (
                                    addedProposals.map((proposal) => (
                                        <div
                                            key={proposal.id}
                                            className="p-4 rounded-lg border border-neutral-200 bg-neutral-50 flex items-start justify-between group"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-neutral-900">{proposal.itemName}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${proposal.type === 'contrat' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                                        }`}>
                                                        {proposal.type}
                                                    </span>
                                                </div>
                                                {proposal.annotation && (
                                                    <p className="text-sm text-neutral-600">{proposal.annotation}</p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleRemoveProposal(proposal.id)}
                                                className="text-neutral-400 hover:text-red-600 p-1 rounded-md hover:bg-white transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="border-t border-neutral-100 pt-6 mt-auto">
                                <button
                                    onClick={handleSubmit}
                                    disabled={addedProposals.length === 0}
                                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${addedProposals.length === 0
                                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                            : 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                                        }`}
                                >
                                    <Check className="w-5 h-5" />
                                    Valider et terminer l'entretien
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
