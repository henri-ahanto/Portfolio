/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Search, ChevronRight, ChevronLeft, Star } from 'lucide-react'
import { AchievementRow } from '@/shared/ui/components/achievements/AchievementRow/AchievementRow'
import { AchievementCreateForm } from '@/shared/ui/components/achievements/AchievementCreateForm/AchievementCreateForm'
import { Achievement } from '@/shared/entities/types/achievement.type'
import {
  getAchievementsAction,
  createAchievementAction,
  updateAchievementAction,
  deleteAchievementAction
} from '@/shared/hooks/useAchievements/action'

interface Props {
  "": 0
}

interface State {
  data: Achievement[]
  meta: { currentPage: number; totalPages: number; totalItems: number }
  loading: boolean
  searchTerm: string
  error: string | null
}

export default class AchievementsDashboardPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: [],
      meta: { currentPage: 1, totalPages: 1, totalItems: 0 },
      loading: true,
      searchTerm: '',
      error: null
    }
  }

  componentDidMount() {
    this.fetchPage(1)
  }

  fetchPage = async (page: number = 1) => {
    this.setState({ loading: true })
    try {
      const response = await getAchievementsAction(page, 8)
      this.setState({
        data: response.items,
        meta: response.meta,
        loading: false
      })
    } catch (err: any) {
      this.setState({ error: err.message, loading: false })
    }
  }

  handleCreate = async (payload: any) => {
    try {
      await createAchievementAction(payload)
      this.fetchPage(this.state.meta.currentPage)
    } catch (err: any) {
      alert(err.message)
    }
  }

  handleUpdate = async (id: string, payload: any) => {
    try {
      await updateAchievementAction(id, payload)
      this.fetchPage(this.state.meta.currentPage)
    } catch (err: any) {
      alert(err.message)
    }
  }

  handleRemove = async (id: string) => {
    if (confirm('Supprimer définitivement ce projet ?')) {
      try {
        await deleteAchievementAction(id)
        this.fetchPage(this.state.meta.currentPage)
      } catch (err: any) {
        alert(err.message)
      }
    }
  }

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    const { data, loading, meta, searchTerm } = this.state
    const pinnedCount = data.filter(a => a.is_pinned).length

    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.status && item.status.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
      <div className="max-w-6xl mx-auto min-h-screen text-slate-200">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-orange-500 flex items-center gap-3">
                <Trophy className="text-amber-500" /> Projets
              </h1>
              {pinnedCount > 0 && (
                <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">
                  {pinnedCount} ÉPINGLÉ(S)
                </span>
              )}
            </div>
            <p className="text-slate-500 mt-2">Gérez vos projets et réalisations.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/5 rounded-2xl outline-none transition-all focus:border-amber-500/50"
              onChange={this.handleSearch}
            />
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Projets</p>
                <p className="text-3xl font-bold text-white mt-1">{data.length}</p>
              </div>
              <Trophy className="text-amber-500" size={24} />
            </div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Épinglés</p>
                <p className="text-3xl font-bold text-white mt-1">{pinnedCount}</p>
              </div>
              <Star className="text-amber-500" size={24} />
            </div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Avec Liens</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {data.filter(a => a.demo_link || a.repository_link).length}
                </p>
              </div>
              <Trophy className="text-amber-500" size={24} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="text-amber-500" size={20} /> Nouveau Projet
              </h2>
              <AchievementCreateForm onCreate={this.handleCreate} />
            </div>
          </aside>

          <main className="lg:col-span-8">
            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center py-20">
                  <div className="w-10 h-10 border-2 border-t-amber-500 rounded-full animate-spin" />
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <AchievementRow 
                          item={item} 
                          onSave={this.handleUpdate} 
                          onDelete={this.handleRemove}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-slate-900/10"
                    >
                      <div className="w-20 h-20 bg-slate-900 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Trophy className="text-slate-700" size={32} />
                      </div>
                      <h3 className="text-white font-black italic uppercase tracking-tighter text-xl mb-2">Aucun projet</h3>
                      <p className="text-slate-500 font-medium text-sm">Commencez par ajouter votre premier projet.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Pagination */}
            {!loading && meta.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  disabled={meta.currentPage === 1}
                  onClick={() => this.fetchPage(meta.currentPage - 1)}
                  className="p-2 bg-slate-900 border border-white/5 rounded-xl disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  disabled={meta.currentPage === meta.totalPages}
                  onClick={() => this.fetchPage(meta.currentPage + 1)}
                  className="p-2 bg-slate-900 border border-white/5 rounded-xl disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    )
  }
}