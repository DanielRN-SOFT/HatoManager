import { router } from '@inertiajs/react';
import React from 'react'
import { SiSwisscows } from 'react-icons/si';

const Header = ({animal}) => {
  return (
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-2">
          <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                  <SiSwisscows className="text-[24px] text-on-primary" />
              </div>
              <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                      Ficha del animal
                  </p>
                  <h1 className="text-2xl font-bold text-on-surface">
                      {animal.name}
                      <span className="ml-2 rounded bg-green-50 px-2 py-0.5 text-base font-bold text-green-700">
                          #{animal.ear_tag}
                      </span>
                  </h1>
              </div>
          </div>
          <div className="flex items-center gap-2">
              <button
                  onClick={() => router.visit(route('animals.index'))}
                  className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 active:scale-95"
              >
                  <span className="material-symbols-outlined text-[18px]">
                      arrow_back
                  </span>
                  Volver
              </button>
              <button
                  onClick={() => router.visit(route('animals.edit', animal.id))}
                  className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
              >
                  <span className="material-symbols-outlined text-[18px]">
                      edit
                  </span>
                  Editar
              </button>
          </div>
      </div>
  );
}

export default Header
