/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Search, ChevronRight, ChevronLeft } from 'lucide-react'
import { StackRow } from '@/shared/ui/components/stacks/StackRow/StackRow'
import { StackCreateForm } from '@/shared/ui/components/stacks/StackCreateForm/StackCreateForm'
import { Stack } from '@/shared/entities/types/stack.type'
import {
  getStacksAction,
  createStackAction,
  updateStackAction,
  deleteStackAction
} from '@/shared/hooks/useStacks/action'

interface Props {
  "": 0
}

interface State {
  data: Stack[]
  meta: { currentPage: number; totalPages: number; totalItems: number }
  loading: boolean
  searchTerm: string
  error: string | null
}

export default class StacksDashboardPage extends Component<Props, State> {
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
      const response = await getStacksAction(page, 8)
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
      await createStackAction(payload)
      this.fetchPage(this.state.meta.currentPage)
    } catch (err: any) {
      alert(err.message)
    }
  }

  handleUpdate = async (id: string, payload: any) => {
    try {
      await updateStackAction(id, payload)
      this.fetchPage(this.state.meta.currentPage)
    } catch (err: any) {
      alert(err.message)
    }
  }

  handleRemove = async (id: string) => {
    if (confirm('Supprimer définitivement cette technologie ?')) {
      try {
        await deleteStackAction(id)
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

    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))    )


    return (
      <div className="max-w-6xl mx-auto min-h-screen text-slate-200">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 flex items-center gap-3">
              <Layers className="text-purple-500" /> Stack Technique
            </h1>
            <p className="text-slate-500 mt-2">Gérez vos technologies et compétences.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/5 rounded-2xl outline-none transition-all focus:border-purple-500/50"
              onChange={this.handleSearch}
            />
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Technologies</p>
                <p className="text-3xl font-bold text-white mt-1">{data.length}</p>
              </div>
              <Layers className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Layers className="text-purple-500" size={20} /> Nouvelle Technologie
              </h2>
              <StackCreateForm onCreate={this.handleCreate} />
            </div>
          </aside>

          <main className="lg:col-span-8">
            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center py-20">
                  <div className="w-10 h-10 border-2 border-t-purple-500 rounded-full animate-spin" />
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <StackRow 
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
                        <Layers className="text-slate-700" size={32} />
                      </div>
                      <h3 className="text-white font-black italic uppercase tracking-tighter text-xl mb-2">Aucune technologie</h3>
                      <p className="text-slate-500 font-medium text-sm">Commencez par ajouter votre première technologie.</p>
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
