export default interface Course {
    title: string
    description: string
    period?: string
    location?: string
    tags?: string[]
    is_pinned: boolean
}