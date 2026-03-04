/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Hash, Search, ChevronRight, ChevronLeft } from 'lucide-react'
import { StaticRow } from '@/shared/ui/components/static/StaticRow/StaticRow'
import { StaticCreateForm } from '@/shared/ui/components/static/StaticCreateForm/StaticCreateForm'
import { StaticContent } from '@/shared/entities/StaticContent'
import {
  getStaticContentAction,
  createStaticContentAction,
  updateStaticContentAction,
  deleteStaticContentAction
} from '@/shared/hooks/useStaticContent/action'
interface Props {
  "": 0
}
interface State {
  data: StaticContent[]
  meta: { currentPage: number; totalPages: number; totalItems: number }
  loading: boolean
  searchTerm: string
  error: string | null
}

export default class StaticDashboardPage extends Component<Props, State> {
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

  // Lifecycle: Equivalent to useEffect(() => { fetchPage(1) }, [])
  componentDidMount() {
    this.fetchPage(1)
  }

  fetchPage = async (page: number = 1) => {
    this.setState({ loading: true })
    try {
      const response = await getStaticContentAction(page, 8)
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
      await createStaticContentAction(payload)
      this.fetchPage(this.state.meta.currentPage)
    } catch (err: any) {
      alert(err.message)
    }
  }

  handleUpdate = async (key: string, value: string) => {
    try {
      await updateStaticContentAction(key, value)
      this.fetchPage(this.state.meta.currentPage)
    } catch (err: any) {
      alert(err.message)
    }
  }

  handleRemove = async (key: string) => {
    try {
      await deleteStaticContentAction(key)
      this.fetchPage(this.state.meta.currentPage)
    } catch (err: any) {
      alert(err.message)
    }
  }

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    const { data, loading, meta, searchTerm } = this.state

    const filteredData = data.filter(item =>
      item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div className="max-w-6xl mx-auto min-h-screen text-slate-200">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-orange-500 flex items-center gap-3">
              <Sparkles className="text-amber-500" /> Contenu Statique
            </h1>
            <p className="text-slate-500 mt-2">Gérez votre portfolio en temps réel.</p>
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

        <div className="grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Hash className="text-amber-500" size={20} /> Nouvelle Clé
              </h2>
              <StaticCreateForm onCreate={this.handleCreate} />
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
                  {filteredData.map((item) => (
                    <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <StaticRow item={item} onSave={this.handleUpdate} onDelete={this.handleRemove} />
                    </motion.div>
                  ))}
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
                {/* Page numbers would go here */}
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