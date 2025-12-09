import React, { useState } from 'react';
import { Person } from '../types';

interface PersonFormProps {
  person?: Person;
  onSubmit: (person: Person) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function PersonForm({
  person,
  onSubmit,
  onCancel,
  submitLabel = 'Valider'
}: PersonFormProps) {
  const [formData, setFormData] = useState({
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    civility: person?.civility || '',
    birthDate: person?.birthDate || '',
    familyStatus: person?.familyStatus || '',
    profession: person?.profession || '',
    street: person?.address?.street || '',
    postalCode: person?.address?.postalCode || '',
    city: person?.address?.city || '',
    country: person?.address?.country || '',
    income: person?.financialSituation?.income || '',
    expenses: person?.financialSituation?.expenses || '',
    taxation: person?.financialSituation?.taxation || '',
    housingType: person?.residence?.housingType || '',
    occupancyStatus: person?.residence?.occupancyStatus || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const newPerson: Person = {
      id: person?.id || `P${Date.now()}`,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      civility: formData.civility.trim() || undefined,
      birthDate: formData.birthDate || undefined,
      familyStatus: formData.familyStatus.trim() || undefined,
      profession: formData.profession.trim() || undefined,
      address: (formData.street || formData.postalCode || formData.city || formData.country) ? {
        street: formData.street.trim(),
        postalCode: formData.postalCode.trim(),
        city: formData.city.trim(),
        country: formData.country.trim()
      } : undefined,
      financialSituation: (formData.income || formData.expenses || formData.taxation) ? {
        income: formData.income.trim(),
        expenses: formData.expenses.trim(),
        taxation: formData.taxation.trim()
      } : undefined,
      residence: (formData.housingType || formData.occupancyStatus) ? {
        housingType: formData.housingType.trim(),
        occupancyStatus: formData.occupancyStatus.trim()
      } : undefined,
      lastModifiedDate: new Date().toISOString(),
      lastModifiedBy: person ? 'Agent en cours' : undefined
    };

    onSubmit(newPerson);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Section: Informations personnelles */}
        <div>
          <h3 className="text-neutral-900 mb-4">Informations personnelles</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="civility" className="block text-neutral-700 mb-2">
                  Civilité
                </label>
                <select
                  id="civility"
                  value={formData.civility}
                  onChange={(e) => handleChange('civility', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner</option>
                  <option value="M.">M.</option>
                  <option value="Mme">Mme</option>
                  <option value="Mlle">Mlle</option>
                </select>
              </div>

              <div>
                <label htmlFor="firstName" className="block text-neutral-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-300' : 'border-neutral-200'
                  }`}
                  placeholder="Jean"
                />
                {errors.firstName && (
                  <p className="mt-1 text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-neutral-700 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-300' : 'border-neutral-200'
                  }`}
                  placeholder="Dupont"
                />
                {errors.lastName && (
                  <p className="mt-1 text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="birthDate" className="block text-neutral-700 mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="familyStatus" className="block text-neutral-700 mb-2">
                  Situation familiale
                </label>
                <select
                  id="familyStatus"
                  value={formData.familyStatus}
                  onChange={(e) => handleChange('familyStatus', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionner</option>
                  <option value="Célibataire">Célibataire</option>
                  <option value="Marié(e)">Marié(e)</option>
                  <option value="Pacsé(e)">Pacsé(e)</option>
                  <option value="Divorcé(e)">Divorcé(e)</option>
                  <option value="Veuf(ve)">Veuf(ve)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="profession" className="block text-neutral-700 mb-2">
                Nom de la profession
              </label>
              <input
                type="text"
                id="profession"
                value={formData.profession}
                onChange={(e) => handleChange('profession', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingénieur, Médecin, etc."
              />
            </div>
          </div>
        </div>

        {/* Section: Adresse */}
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-neutral-900 mb-4">Adresse</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="street" className="block text-neutral-700 mb-2">
                Numéro et rue
              </label>
              <input
                type="text"
                id="street"
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="15 rue de la République"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="postalCode" className="block text-neutral-700 mb-2">
                  Code postal
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="75001"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-neutral-700 mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Paris"
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-neutral-700 mb-2">
                Pays
              </label>
              <input
                type="text"
                id="country"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="France"
              />
            </div>
          </div>
        </div>

        {/* Section: Situation financière */}
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-neutral-900 mb-4">Situation financière</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="income" className="block text-neutral-700 mb-2">
                Revenus
              </label>
              <input
                type="text"
                id="income"
                value={formData.income}
                onChange={(e) => handleChange('income', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10000"
              />
            </div>

            <div>
              <label htmlFor="expenses" className="block text-neutral-700 mb-2">
                Dépenses
              </label>
              <input
                type="text"
                id="expenses"
                value={formData.expenses}
                onChange={(e) => handleChange('expenses', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5000"
              />
            </div>

            <div>
              <label htmlFor="taxation" className="block text-neutral-700 mb-2">
                Impôt
              </label>
              <input
                type="text"
                id="taxation"
                value={formData.taxation}
                onChange={(e) => handleChange('taxation', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2000"
              />
            </div>
          </div>
        </div>

        {/* Section: Logement */}
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-neutral-900 mb-4">Logement</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="housingType" className="block text-neutral-700 mb-2">
                Type de logement
              </label>
              <input
                type="text"
                id="housingType"
                value={formData.housingType}
                onChange={(e) => handleChange('housingType', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Appartement"
              />
            </div>

            <div>
              <label htmlFor="occupancyStatus" className="block text-neutral-700 mb-2">
                Statut d'occupation
              </label>
              <input
                type="text"
                id="occupancyStatus"
                value={formData.occupancyStatus}
                onChange={(e) => handleChange('occupancyStatus', e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Propriétaire"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-neutral-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}