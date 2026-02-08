export enum status {
    NON_DEMARRER = 'not_start',
    DEMARRER = 'demarrer',
    EN_COURS = 'in_progress',
    FINI = 'finish',
    ABANDONNER = 'give_up',
    EN_REVISION = 'in_revise'
}

export const STATUS_CONFIG = {
  [status.NON_DEMARRER]: {
    label: 'Non démarré',
    color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    iconColor: 'text-slate-500'
  },
  [status.DEMARRER]: {
    label: 'Démarré',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    iconColor: 'text-blue-400'
  },
  [status.EN_COURS]: {
    label: 'En cours',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    iconColor: 'text-indigo-400'
  },
  [status.FINI]: {
    label: 'Terminé',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    iconColor: 'text-emerald-400'
  },
  [status.ABANDONNER]: {
    label: 'Abandonné',
    color: 'bg-red-500/10 text-red-400 border-red-500/20',
    iconColor: 'text-red-400'
  },
  [status.EN_REVISION]: {
    label: 'En révision',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    iconColor: 'text-amber-400'
  }
}