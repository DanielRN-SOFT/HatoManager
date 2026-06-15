import React from 'react'

const TabSanidad = ({activeTab, animal, healthRecords, formatDate}) => {
  return (
      <>
          {activeTab === 'salud' && (
              <div>
                  {animal.previous_diseases && (
                      <div className="mb-4 flex items-start gap-3 rounded-2xl border border-outline-variant bg-surface-container p-4">
                          <span className="material-symbols-outlined text-on-surface-variant">
                              info
                          </span>
                          <div>
                              <p className="mb-1 text-sm font-bold text-on-surface">
                                  Antecedentes médicos
                              </p>
                              <p className="text-sm text-on-surface-variant">
                                  {animal.previous_diseases}
                              </p>
                          </div>
                      </div>
                  )}

                  {healthRecords.length > 0 && (
                      <div
                          className={
                              healthRecords.length > 5
                                  ? 'max-h-[28rem] overflow-y-auto pr-1'
                                  : ''
                          }
                      >
                          <div className="flex flex-col gap-3">
                              {healthRecords.map((h) => (
                                  <div
                                      key={h.id}
                                      className="rounded-2xl border border-outline-variant p-4"
                                  >
                                      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                              {h.type}
                                          </span>
                                          <span className="text-xs text-on-surface-variant">
                                              {formatDate(h.applied_at)}
                                          </span>
                                      </div>
                                      {h.product && (
                                          <p className="text-sm font-semibold text-on-surface">
                                              {h.product}
                                              {h.dose ? ` · ${h.dose}` : ''}
                                          </p>
                                      )}
                                      {h.notes && (
                                          <p className="mt-1 text-sm text-on-surface-variant">
                                              {h.notes}
                                          </p>
                                      )}
                                      {h.next_date && (
                                          <p className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant">
                                              <span className="material-symbols-outlined text-sm">
                                                  event_repeat
                                              </span>
                                              Próxima aplicación:{' '}
                                              {formatDate(h.next_date)}
                                          </p>
                                      )}
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          )}
      </>
  );
}

export default TabSanidad
