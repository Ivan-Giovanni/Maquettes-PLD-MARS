import React from 'react';
import { User } from 'lucide-react';
import { Person } from '../types';

interface PersonCardProps {
  person: Person;
  onClick?: () => void;
}

export default function PersonCard({ person, onClick }: PersonCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 bg-white border border-neutral-200 rounded-lg ${
        onClick ? 'cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-neutral-900 mb-1">
            {person.firstName} {person.lastName}
          </h3>
          <p className="text-neutral-600 mb-1">{person.email}</p>
          <p className="text-neutral-600">{person.phone}</p>
          {person.role && (
            <span className="inline-block mt-2 px-2 py-1 bg-neutral-100 text-neutral-700 rounded">
              {person.role}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
